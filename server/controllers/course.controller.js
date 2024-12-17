import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
    deleteMediaFromCloudinary,
    deleteVideoFromCloudinary,
    uploadMedia,
} from "../utils/cloudinary.js";
import { findResourceById } from "../utils/helpers.js";
import Joi from "joi";

// Validation Schemas
const courseSchema = Joi.object({
    courseTitle: Joi.string().required(),
    category: Joi.string().required(),
});
const lectureSchema = Joi.object({
    lectureTitle: Joi.string().required(),
});

// Create Course
export const createCourse = async (req, res) => {
    try {
        const { error } = courseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { courseTitle, category } = req.body;

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id,
        });

        return res.status(201).json({
            course,
            message: "Course created successfully.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create course." });
    }
};

// Search Courses
export const searchCourse = async (req, res) => {
    try {
        const {
            query = "",
            categories = [],
            sortByPrice = "",
            page = 1,
            limit = 10,
        } = req.query;

        const searchCriteria = {
            isPublished: true,
            $or: [
                { courseTitle: { $regex: query, $options: "i" } },
                { subTitle: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ],
        };

        if (categories.length > 0) {
            searchCriteria.category = { $in: categories };
        }

        const sortOptions = {};
        if (sortByPrice === "low") sortOptions.coursePrice = 1;
        else if (sortByPrice === "high") sortOptions.coursePrice = -1;

        const courses = await Course.find(searchCriteria)
            .populate({ path: "creator", select: "name photoUrl" })
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit);

        const totalCourses = await Course.countDocuments(searchCriteria);

        return res.status(200).json({
            success: true,
            courses,
            totalCourses,
            totalPages: Math.ceil(totalCourses / limit),
            currentPage: parseInt(page, 10),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to search courses." });
    }
};

// Get Published Courses
export const getPublishedCourses = async (_, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({
            path: "creator",
            select: "name photoUrl",
        });

        return res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to get published courses." });
    }
};

// Edit Course
export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
        } = req.body;
        const thumbnail = req.file;

        let course = await findResourceById(Course, courseId, "Course");

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId);
            }
            try {
                courseThumbnail = await uploadMedia(thumbnail.path);
            } catch (uploadError) {
                return res.status(500).json({ message: "Failed to upload thumbnail." });
            }
        }

        const updateData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: courseThumbnail?.secure_url,
        };

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        return res.status(200).json({
            course,
            message: "Course updated successfully.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update course." });
    }
};

// Toggle Publish Status
export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query; // true or false

        const course = await findResourceById(Course, courseId, "Course");
        course.isPublished = publish === "true";
        await course.save();

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({ message: `Course is ${statusMessage}.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to toggle publish status." });
    }
};

// Other Functions (Get by ID, Create Lecture, etc.) use similar patterns for optimization
