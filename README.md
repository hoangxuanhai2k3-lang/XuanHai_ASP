# HaiCMS Fashion

## 1. Giới thiệu

**HaiCMS Fashion** là website bán thời trang nữ, tập trung vào các sản phẩm công sở, đầm dạ hội, áo thiết kế, chân váy, quần âu, áo vest, phụ kiện thời trang và trang phục mặc ở nhà.

Hệ thống được xây dựng theo mô hình Full-stack, gồm:

* Backend ASP.NET Core MVC và Web API.
* Frontend ReactJS.
* Cơ sở dữ liệu Microsoft SQL Server.
* Entity Framework Core để thao tác dữ liệu.
* Phân quyền Admin và Editor.
* Trang bán hàng dành cho khách hàng.
* gRPC Service dùng để lấy danh sách danh mục sản phẩm.

---

## 2. Công nghệ sử dụng

### Backend

* ASP.NET Core 8.
* ASP.NET Core MVC.
* ASP.NET Core Web API.
* Entity Framework Core.
* Microsoft SQL Server.
* Cookie Authentication.
* Authorization theo vai trò Admin và Editor.
* Swagger.
* gRPC.
* Protocol Buffers.

### Frontend

* ReactJS.
* Axios.
* JavaScript.
* HTML5.
* CSS3.
* LocalStorage.
* Điều hướng trang theo URL.

---

## 3. Cấu trúc dự án

```text
HaiCMS_Solution/
├── CMS.Backend/          # ASP.NET Core MVC, Web API và trang quản trị
├── CMS.Data/             # Entity, DbContext và Migration
├── CMS.gRPCService/      # Dịch vụ gRPC
├── cms.frontend/         # Giao diện khách hàng bằng ReactJS
├── .gitignore
├── README.md
└── HaiCMS_Solution.sln
```

### CMS.Backend

Chứa:

* Controller cho giao diện quản trị.
* Controller Web API cho ReactJS.
* View Razor dành cho Admin và Editor.
* Cấu hình Cookie Authentication.
* Cấu hình phân quyền.
* Swagger.
* CORS.
* Static files và hình ảnh sản phẩm.

### CMS.Data

Chứa:

* Các Entity.
* `ApplicationDbContext`.
* Migration.
* Cấu hình quan hệ giữa các bảng.

### CMS.gRPCService

Chứa:

* File Protocol Buffer.
* `Category.proto`.
* `CategoryGrpcService`.
* Kết nối cơ sở dữ liệu bằng Entity Framework Core.
* Service lấy danh sách danh mục sản phẩm.

### cms.frontend

Chứa:

* Giao diện trang chủ.
* Trang cửa hàng.
* Trang danh sách bài viết.
* Trang chi tiết bài viết.
* Trang giới thiệu.
* Trang liên hệ.
* Trang giỏ hàng.
* Các service gọi Web API.

---

## 4. Chức năng chính

### Khách hàng

* Xem trang chủ website.
* Xem banner thời trang.
* Xem sản phẩm nổi bật.
* Xem tất cả sản phẩm.
* Xem sản phẩm theo danh mục.
* Phân trang danh sách sản phẩm.
* Xem chi tiết sản phẩm.
* Tìm kiếm sản phẩm.
* Thêm sản phẩm vào giỏ hàng.
* Tăng hoặc giảm số lượng trong giỏ hàng.
* Xóa sản phẩm khỏi giỏ hàng.
* Đặt hàng.
* Xem danh sách bài viết thời trang.
* Xem chi tiết bài viết theo ID.
* Xem bài viết liên quan.
* Gửi bình luận bài viết.
* Chỉ hiển thị bình luận đã được duyệt.
* Gửi thông tin liên hệ cho cửa hàng.
* Xem trang giới thiệu HaiCMS Fashion.

### Admin và Editor

* Đăng nhập trang quản trị.
* Phân quyền theo vai trò Admin và Editor.
* Quản lý danh mục bài viết.
* Quản lý bài viết.
* Quản lý thành viên.
* Quản lý danh mục sản phẩm.
* Quản lý sản phẩm.
* Quản lý sản phẩm nổi bật.
* Đặt hoặc bỏ trạng thái nổi bật của sản phẩm.
* Quản lý khách hàng.
* Quản lý đơn hàng.
* Quản lý chi tiết đơn hàng.
* Xem liên hệ của khách hàng.
* Đánh dấu liên hệ đã đọc hoặc chưa đọc.
* Xóa liên hệ khách hàng.
* Xem bình luận bài viết.
* Duyệt bình luận bài viết.
* Xóa bình luận không phù hợp.

---

## 5. Chức năng Buổi 9

### Routing và trang chi tiết bài viết

Hệ thống đã xây dựng:

* Trang danh sách bài viết:

```text
http://localhost:3000/blog
```

* Trang chi tiết bài viết theo ID:

```text
http://localhost:3000/blog/{id}
```

Ví dụ:

```text
http://localhost:3000/blog/4
```

Trang chi tiết bài viết gồm:

* Tiêu đề bài viết.
* Ngày đăng.
* Hình ảnh.
* Nội dung bài viết.
* Tin nổi bật.
* Bài viết liên quan.
* Form gửi bình luận.
* Danh sách bình luận đã được Admin hoặc Editor duyệt.

ID bài viết được lấy từ địa chỉ URL để gọi dữ liệu tương ứng từ Web API.

---

## 6. Chức năng Buổi 10

### gRPC Service

Dự án có thêm project:

```text
CMS.gRPCService
```

Service được xây dựng bằng:

* ASP.NET Core gRPC.
* Protocol Buffers.
* Entity Framework Core.
* SQL Server.

File định nghĩa service:

```text
CMS.gRPCService/Protos/Category.proto
```

Method chính:

```text
CategoryService/GetCategories
```

Method dùng để lấy danh sách danh mục sản phẩm từ cơ sở dữ liệu.

Địa chỉ gRPC Service:

```text
https://localhost:7135
```

Service đã được kiểm tra thành công bằng Postman gRPC và trả về trạng thái:

```text
0 OK
```

Ví dụ kết quả:

```json
{
  "categories": [
    {
      "id": 0,
      "name": "Đầm dạ hội"
    },
    {
      "id": 1,
      "name": "Đồ công sở nữ"
    },
    {
      "id": 2,
      "name": "Áo thiết kế"
    }
  ]
}
```

---

## 7. Yêu cầu cài đặt

Cần cài đặt các phần mềm sau:

* Visual Studio 2022.
* .NET SDK 8.
* Microsoft SQL Server.
* SQL Server Management Studio.
* Node.js.
* npm.
* Git.
* Postman để kiểm tra REST API và gRPC.

---

## 8. Hướng dẫn chạy Backend

### Bước 1: Mở Solution

Mở file:

```text
HaiCMS_Solution.sln
```

bằng Visual Studio 2022.

### Bước 2: Cấu hình Connection String

Mở file:

```text
CMS.Backend/appsettings.json
```

Cập nhật chuỗi kết nối SQL Server phù hợp với máy đang sử dụng.

Ví dụ:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=HaiCMS_DB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Nếu SQL Server sử dụng tên instance khác, thay `localhost` bằng tên SQL Server trên máy.

Ví dụ:

```text
Server=PC\SQLEXPRESS
```

### Bước 3: Cập nhật cơ sở dữ liệu

Trong Visual Studio chọn:

```text
Tools
→ NuGet Package Manager
→ Package Manager Console
```

Chạy lệnh:

```powershell
Update-Database -Project CMS.Data -StartupProject CMS.Backend
```

### Bước 4: Chọn Startup Project

Trong Solution Explorer:

```text
Nhấn chuột phải CMS.Backend
→ Set as Startup Project
```

### Bước 5: Chạy Backend

Nhấn:

```text
F5
```

hoặc:

```text
Ctrl + F5
```

Địa chỉ Backend:

```text
https://localhost:7132
```

Địa chỉ Swagger:

```text
https://localhost:7132/swagger
```

Trang đăng nhập quản trị:

```text
https://localhost:7132/Account/Login
```

---

## 9. Hướng dẫn chạy Frontend

### Bước 1: Mở Terminal

Di chuyển vào thư mục frontend:

```bash
cd cms.frontend
```

Nếu đang đứng ngoài thư mục solution:

```bash
cd /d D:\HaiCMS_Solution\cms.frontend
```

### Bước 2: Cài đặt thư viện

Chỉ cần chạy ở lần đầu:

```bash
npm install
```

### Bước 3: Chạy Frontend

```bash
npm start
```

Địa chỉ Frontend:

```text
http://localhost:3000
```

### Một số trang Frontend

Trang chủ:

```text
http://localhost:3000
```

Trang cửa hàng:

```text
http://localhost:3000/shop
```

Trang danh sách bài viết:

```text
http://localhost:3000/blog
```

Trang chi tiết bài viết:

```text
http://localhost:3000/blog/4
```

Trang giới thiệu:

```text
http://localhost:3000/about
```

Trang liên hệ:

```text
http://localhost:3000/contact
```

---

## 10. Hướng dẫn chạy gRPC Service

### Bước 1: Cấu hình Connection String

Mở file:

```text
CMS.gRPCService/appsettings.json
```

Cấu hình:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=HaiCMS_DB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### Bước 2: Chọn Startup Project

Trong Solution Explorer:

```text
Nhấn chuột phải CMS.gRPCService
→ Set as Startup Project
```

### Bước 3: Chạy Service

Nhấn:

```text
Ctrl + F5
```

Địa chỉ HTTPS:

```text
https://localhost:7135
```

Địa chỉ HTTP:

```text
http://localhost:5175
```

### Bước 4: Kiểm tra bằng Postman

Trong Postman:

```text
New
→ gRPC Request
```

Nhập địa chỉ:

```text
https://localhost:7135
```

Import file:

```text
CMS.gRPCService/Protos/Category.proto
```

Chọn method:

```text
CategoryService/GetCategories
```

Message:

```json
{}
```

Sau đó nhấn:

```text
Invoke
```

---

## 11. Thứ tự chạy dự án

Để website hoạt động đúng, chạy theo thứ tự:

1. Khởi động SQL Server.
2. Chạy project `CMS.Backend`.
3. Kiểm tra Backend tại:

```text
https://localhost:7132
```

4. Mở Terminal tại thư mục:

```text
cms.frontend
```

5. Chạy:

```bash
npm start
```

6. Truy cập:

```text
http://localhost:3000
```

7. Khi cần kiểm tra gRPC, chạy riêng project:

```text
CMS.gRPCService
```

---

## 12. Một số địa chỉ quan trọng

### Frontend

```text
http://localhost:3000
```

### Backend

```text
https://localhost:7132
```

### Swagger

```text
https://localhost:7132/swagger
```

### Trang quản trị

```text
https://localhost:7132/Account/Login
```

### Trang cửa hàng

```text
http://localhost:3000/shop
```

### Trang bài viết

```text
http://localhost:3000/blog
```

### gRPC Service

```text
https://localhost:7135
```

---

## 13. Các API chính

### Danh mục sản phẩm

```text
GET /api/CategoriesProducts
```

### Danh sách sản phẩm

```text
GET /api/Products
```

### Chi tiết sản phẩm

```text
GET /api/Products/{id}
```

### Sản phẩm theo danh mục

```text
GET /api/Products/category/{categoryProductId}
```

### Tìm kiếm sản phẩm

```text
GET /api/Products/search?keyword={keyword}
```

### Sản phẩm nổi bật

```text
GET /api/Products/featured
```

### Danh sách bài viết

```text
GET /api/Posts
```

### Chi tiết bài viết

```text
GET /api/Posts/{id}
```

### Bài viết theo danh mục

```text
GET /api/Posts/category/{categoryId}
```

### Gửi liên hệ

```text
POST /api/Contacts
```

### Gửi bình luận

```text
POST /api/PostComments
```

### Bình luận đã duyệt theo bài viết

```text
GET /api/PostComments/post/{postId}
```

---

## 14. Lưu ý

* Phải chạy Backend trước khi chạy Frontend.
* Nếu React không gọi được API, cần kiểm tra Backend có đang chạy không.
* Kiểm tra đúng cổng Backend là `7132`.
* Kiểm tra CORS trong `Program.cs`.
* Khi thay đổi cổng Backend, cần sửa `API_URL` trong frontend.
* Không đưa mật khẩu Gmail hoặc thông tin bảo mật lên GitHub.
* Không đưa connection string có tài khoản và mật khẩu thật lên GitHub.
* Không đưa thư mục `node_modules` lên GitHub.
* Không đưa các thư mục `bin`, `obj` và `.vs` lên GitHub.
* Không đưa file chứa thông tin bí mật lên repository công khai.
* gRPC phải chạy bằng HTTP/2.
* Khi kiểm tra gRPC bằng Postman, nên sử dụng địa chỉ HTTPS.
* Admin và Editor mới được truy cập trang quản trị liên hệ và bình luận.

---

## 15. Thông tin sinh viên

* **Họ và tên:** Hoàng Xuân Hải
* **MSSV:** 2123110479
* **Lớp:** CCQ2311M
* **Môn học:** Chuyên đề ASP.NET
* **Tên đề tài:** Xây dựng website bán thời trang HaiCMS Fashion
* **Năm thực hiện:** 2026
