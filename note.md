# cách sửa dụng github:
# git init: khởi tạo file .git  ===========  git add . :thêm file cbi commit  ===========  git commit -m "123": note 
# git remote add origin https://github.com/Tai-TZ/....: copy trên web
# git push -u origin main: đẩy code lên git
 
# #################################################################################
# Migration là một cách để quản lý cấu trúc cơ sở dữ liệu của ứng dụng. Khi thay đổi cấu trúc của cơ sở dữ liệu, ví dụ như thêm bảng mới, thay đổi cột, hoặc thêm ràng buộc, có thể sử dụng migration để thực hiện các thay đổi này một cách có cấu trúc và tự động.

# #################################################################################
# Cài đặt package nvm ver 1.1.7 (Node version Maneger): để quản lý ver của Nodejs cũ và mới 
# *Giúp cho có thể vừa code project bởi Nodejs mới và project bởi Nodejs cũ *
# 1. Gỡ Nodejs hiện tại, 2. install nvm trên github, 3.install nodejs(cài các version nodejs muốn cài) nvm install *node_ver, 4 Chỉ sử dụng một version nodejs, nvm use *node_ver

# Sử dụng Emitter event để clear data, 1 component FIRE EVENT , 1 component LISTEN EVENT

# req.body (POST) , req.query (GET)


# #################################################################################
# Fix lỗi đặt tên tablename của Sequelize: mặc định những table đứng 1 mình thì sẽ bị sqlize thêm "s" -> không tìm thấy ví dụ: "database.tables",   cách fix thêm ** freezeTableName: true ** vào bên dưới  modelName: trong model của table đó


# NODEJS
1. npm init: khởi tạo dự án

2. npm i body-parser@1.19.0 dotenv@8.2.0 ejs@3.1.5 express@4.17.1
    + body-parser: xử lý dữ liệu được gửi từ client lên server thông qua HTTP request
    + ejs: tạo và hiển thị các trang web động.
    + express: framework.
    + dotenv là một thư viện Node.js được sử dụng để quản lý các biến hoặc lấy tham số trong file môi trường

3.  npm install --save-dev @babel/core@7.19.3 @babel/preset-env@7.19.3 @babel/node@7.19.1 nodemon@2.0.7
    + Tool Babel (@babel/core, @babel/preset-env, @babel/node): trình biên dịch JavaScript giúp chuyển đổi và tối ưu hóa mã JavaScript mới nhất thành các phiên bản tương thích với các trình duyệt hoặc môi trường chạy cũ hơn. 
    + nodemon: server tự động restart khi lưu 
        trong file package.json: thêm vào script *"start": "nodemon --exec babel-node src/server.js"*
    
4. Cài đặt database Xampp

5. npm install --save-dev sequelize-cli@6.6.1: thành phần cần thiết khi làm việc với csdl

6. npm install --save sequelize@6.6.2,  npm install --save mysql2@2.2.5: sử dụng sequelize

7. npx sequelize-cli db:migrate: được sử dụng để chạy các migration chưa được chạy trên cơ sở dữ liệu. (tạo bảng đã đc định nghĩa)

8. Bootstrap 4 CDN

9. npm i --save bcryptjs@2.4.3: package mã hóa mật khẩu người dùng
    
10. npm i --save cors@2.8.5 : cầu hình cho server chạy api vào tên miền cụ thể, dùng để fix lỗi cors

11. npm i --save-exact nodemailer@6.6.3: Cài nodemailer để làm chức năng gửi mail

12. npm i --save-exact uuid@8.3.2: tạo ra 1 chuỗi định dạng duy nhất cho ID (tạo token)

# REACTJS
1. Redux for Reactjs: thư viện quản lý state như localstorage nhưng bảo mật hơn 

2. React Slick: npm install --save react-slick@0.28.1, thư viện css như bootstraps
    slick carousel: npm install --save slick-carousel@1.8.1: tạo các img, text,.. thành slideshow đẹp 

3. react-redux: thư viện giúp conn redux - react

4. react-image-lightbox: npm i --save  react-image-lightbox@5.1.1, thư viện giúp phóng to ảnh

5. react-markdown-editor-lite: npm install --save react-markdown-editor-lite@1.3.0 dùng để tạo một trình soạn thảo markdown trong ứng dụng web, ví dụ: tạo blog, tạo trang chi tiết ng dùng

6. dependency của "react-markdown-editor-lite":  npm install --save markdown-it@12.1.0

7. react-select:  npm install --save react-select@4.3.1, tích hợp vừa SEARCH vừa SELECT

8. npm i --save react-number-format@4.6.4: thư viện React được sử dụng để hiển thị các con số theo quy tắc, kiểu định dạng và các tùy chọn khác nhau.




























