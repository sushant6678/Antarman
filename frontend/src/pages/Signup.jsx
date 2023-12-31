import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../assets/images/signup.gif";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import HashLoader from "react-spinners/HashLoader";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "patient",
    photo: selectedFile,
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState(""); // Add this line
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      // Check if the value contains only letters
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setNameError("Name must contain only letters and spaces.");
      } else {
        setNameError(""); // Reset the error message when it's valid
      }
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewUrl(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
      setPasswordError("Password must contain at least 8 characters, one capital letter, one special character, and one number.");
      return;
    } else {
      setPasswordError("");
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (res.status === 400) {
        throw new Error(message);
      }

      // Registration was successful, now send a verification email
      // await sendVerificationEmail(formData.email, formData.role);
      // Check if the role is "patient" before sending the verification email
      console.log("Role:", formData.role);

      // Check if the role is "patient" before sending the verification email
      if (formData.role === "patient") {
        console.log("Sending verification email for the patient");
        await sendVerificationEmail(formData.email, formData.role);
      } else {
        console.log("Role is not patient, skipping verification email");
        // Optionally, you can add code here to handle other roles (e.g., doctor)
      }

      // Optionally, you can add an else block to handle other cases
      // For example, you can display a message or take other actions if the role is not "patient."

      console.log(formData.email, formData.role);

      setLoading(false);
      toast.success(message);
      if (formData.role === "patient") {
        navigate("/verify");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const sendVerificationEmail = async (email, role) => {
    try {
      // Make a POST request to your backend to send the verification email
      const res = await fetch(`${BASE_URL}/send-verification-email`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      // Check the response status
      if (!res.ok) {
        const errorMessage = await res.text(); // Read the response as text
        throw new Error(errorMessage);
      }

      const responseData = await res.json(); // Try to parse as JSON

      toast.success(responseData.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* ============ img box ========= */}
          <div className="hidden lg:block bg-[#0067FF] rounded-l-lg">
            <figure className="rounded-l-lg">
              <img className="w-full rounded-l-lg" src={signupImg} alt="" />
            </figure>
          </div>

          <div className="rounded-l-lg  lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-[#0067FF]">Account</span>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              {/* Display name error message */}
              {nameError && (
                <p className="text-red-500">{nameError}</p>
              )}

              <div className="mb-5">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  placeholder="Password"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              {/* Display password error message */}
              {passwordError && (
                <p className="text-red-500">{passwordError}</p>
              )}

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[16px] leading-7]">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0067FF] flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative inline-block w-[130px] h-[50px]">
                  <input
                    className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    id="customFile"
                    name="photo"
                    type="file"
                    accept=".jpg,.png"
                    placeholder="Upload Profile"
                    onChange={handleFileInputChange}
                  />

                  <label
                    className="custom-file-label absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                    htmlFor="customFile"
                  >
                    {selectedFile ? selectedFile.name : "Upload Photo"}
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  disabled={loading && true}
                  className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Sign Up"}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-[#0067FF] font-medium">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
