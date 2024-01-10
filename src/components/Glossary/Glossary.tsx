import { useGetSingleGlossaryQuery } from '@/redux/api/adminApi/glossaryApi'
import React from 'react'

import parse from "html-react-parser";

// const glossaryData = <>
//    <ul>
//       <li>Addition: The mathematical operation of combining two or more quantities to find the total or sum.</li>
//       <li>Subtraction: The mathematical operation of taking away or removing a quantity from another to find the difference.</li>
//       <li>Number Bonds: A visual representation of a number and its parts, showing the relationship between a whole number and its parts.</li>
//       <li>Place Value: The value of a digit based on its position in a number, such as ones, tens, and hundreds.</li>
//       <li>Comparing Numbers: Determining if one number is greater than, less than, or equal to another number.</li>
//       <li>Skip Counting: Counting by a certain number repeatedly, such as counting by twos, fives, or tens.</li>
//       <li>Patterns: Repeating sequences of shapes, colors, or objects.</li>
//       <li>Measurement: The process of comparing the size or length of an object using standard units, such as inches, centimeters, etc.</li>
//       <li>Time: The measurement of the sequence of events, such as days, weeks, months, and hours.</li>
//       <li>Money: The concept of understanding and using coins and bills for transactions.</li>
//       <li>Graphing: Representing data using different types of graphs, such as bar graphs, pictographs, and tally charts.</li>
//       <li>Shapes: Geometric figures with specific attributes, such as squares, circles, triangles, rectangles, etc.</li>
//       <li>Weight: The measure of how heavy an object is.</li>
//       <li>Capacity: The amount of liquid a container can hold.</li>
//       <li>Ordinal Numbers: Numbers that indicate the order or position of objects in a set (e.g., first, second, third).</li>
//       <li>Geometry: The study of shapes, angles, and spatial relationships.</li>
//       <li>Fractions: A part of a whole or a part of a set, represented as a/b, where a is the numerator and b is the denominator.</li>
//       <li>Data Analysis: Collecting, organizing, and interpreting data to make conclusions and predictions.</li>
//       <li>Estimation: Making an educated guess or approximation of a quantity or measurement.</li>
//       <li>Problem Solving: Using mathematical concepts and strategies to find solutions to real-life or mathematical problems.</li>
//       <li>Even and Odd Numbers: Determining if a number can be divided evenly by 2 (even) or not (odd).</li>
//       <li>Money Word Problems: Mathematical problems involving transactions and money amounts.</li>
//       <li>Measurement Word Problems: Mathematical problems involving length, weight, or capacity.</li>
//       <li>Time Word Problems: Mathematical problems involving time and elapsed time.</li>
//       <li>2D and 3D Shapes: Exploring two-dimensional and three-dimensional shapes and their attributes.</li>
//     </ul>
// </>
export default function GlossaryPage({moduleId}:{moduleId:string}) {


   const {data:glossaryData,isLoading}= useGetSingleGlossaryQuery(moduleId)

   console.log("🚀 ~ GlossaryPage ~ glossaryData:", glossaryData)
// 



  return (
    <div>
         {glossaryData?.details && parse(glossaryData?.details)}
    </div>
  )
}
