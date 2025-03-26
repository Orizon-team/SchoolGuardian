const URL = "https://assists-api.onrender.com/api/clases";

export async function classTeacherRequest(): {

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
           authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            "id": localStorage.getItem("id")
        })
    });
}