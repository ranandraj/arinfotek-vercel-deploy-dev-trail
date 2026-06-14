import { useState } from "react";

function StudentList() {

    const [students, setStudents] = useState([]);

    const getStudents = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/students"
            );

            const data = await response.json();

            setStudents(data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-5">
                Student Details
            </h1>

            <button
                onClick={getStudents}
                className="bg-green-600 text-white px-4 py-2 rounded mb-5"
            >
                Load Students
            </button>

            <table className="w-full border">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="border p-2">
                            ID
                        </th>

                        <th className="border p-2">
                            Name
                        </th>

                        <th className="border p-2">
                            Course
                        </th>

                        <th className="border p-2">
                            Username
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {students.map((student) => (

                        <tr key={student.student_id}>

                            <td className="border p-2">
                                {student.student_id}
                            </td>

                            <td className="border p-2">
                                {student.student_name}
                            </td>

                            <td className="border p-2">
                                {student.course}
                            </td>

                            <td className="border p-2">
                                {student.username}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default StudentList;