import React, { useState } from 'react';

const Profile: React.FC = () => {
  // State để lưu thông tin người dùng
  const [name, setName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('johndoe@example.com');
  const [gender, setGender] = useState<string>('Male');
  const [avatar, setAvatar] = useState<string | null>(null);

  // Hàm xử lý thay đổi tên
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Hàm xử lý thay đổi email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Hàm xử lý thay đổi giới tính
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  // Hàm xử lý tải lên ảnh avatar
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // Cập nhật avatar sau khi tải lên
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm lưu thay đổi (giả lập)
  const handleSave = () => {
    // Bạn có thể lưu thông tin này vào backend hoặc localStorage ở đây
    alert('Thông tin đã được lưu!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Chỉnh sửa hồ sơ</h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={avatar || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full border-2 border-gray-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </label>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>

        {/* Tên */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Nhập tên của bạn"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Nhập email của bạn"
          />
        </div>

        {/* Giới tính */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Giới tính</label>
          <select
            id="gender"
            value={gender}
            onChange={handleGenderChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>

        {/* Nút lưu */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white p-2 rounded-md w-full mt-6"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
