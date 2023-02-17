var callApi = new CallAPI();
var validation = new Validation();

var empList = [];

fetchListData();

/**
 * Dom with id
 * @param {*} id
 * @returns
 */
function getEle(id) {
   return document.getElementById(id);
}

/**
 * Get list employee with API
 */
function fetchListData() {
   getEle("loader").style.display = "block";

   callApi
      .fetchEmployees()
      .then(function (result) {
         // Save list employee in global variable
         empList = result.data;
         renderTable(result.data);
         getEle("loader").style.display = "none";
      })
      .catch(function (error) {
         getEle("loader").style.display = "none";
         console.log(error);
      });
}

function fetchData(id) {
   callApi
      .fetchEmployee(id)
      .then(function (result) {
         fillForm(result.data);
      })
      .catch(function (error) {
         console.log(error);
      });
}

/**
 * Get data input from Form
 * @returns employee
 */
function getDataForm(isAdd) {
   var maNhanVien = getEle("empId").value * 1;
   var tenNhanVien = getEle("empName").value;
   var heSoChucVu = getEle("empPst").value * 1;
   var chucVu = "";
   var luongCoBan = getEle("empSalary").value * 1;
   var soGioLamTrongThang = getEle("empTime").value * 1;

   switch (heSoChucVu) {
      case 1:
         chucVu = "Nhân viên";
         break;
      case 2:
         chucVu = "Quản lý";
         break;
      case 3:
         chucVu = "Giám đốc";
         break;
   }

   var isValid = true;

   // Check id employee
   if (isAdd) {
      isValid &=
         validation.checkIdDigit(
            maNhanVien,
            "nfEmpId",
            "(*) Mã nhân viên từ 4-6 ký tự số!"
         ) &&
         validation.checkIdDuplicate(
            maNhanVien,
            "nfEmpId",
            "(*) Mã nhân viên đã tồn tại!",
            empList
         );
   }

   // Check name employee
   isValid &=
      validation.checkEmpty(
         tenNhanVien,
         "nfEmpName",
         "(*) Vui lòng nhập tên nhân viên!"
      ) &&
      validation.checkCharacterString(
         tenNhanVien,
         "nfEmpName",
         "(*) Tên nhân viên là chữ"
      );

   // Check employee salary
   isValid &=
      validation.checkEmpty(
         luongCoBan,
         "nfEmpSalary",
         "(*) Vui lòng nhập lương cơ bản!"
      ) &&
      validation.checkNumberDigit(
         luongCoBan,
         "nfEmpSalary",
         "(*) Lương cơ bản là số"
      ) &&
      validation.checkSalary(
         luongCoBan,
         "nfEmpSalary",
         "(*) Lương cơ bản 1 000 000 - 20 000 000"
      );

   // Check employee work time
   isValid &=
      validation.checkEmpty(
         soGioLamTrongThang,
         "nfEmpTime",
         "(*) Vui lòng nhập số giờ làm!"
      ) &&
      validation.checkNumberDigit(
         soGioLamTrongThang,
         "nfEmpTime",
         "(*) Số giờ làm là số!"
      ) &&
      validation.checkWorkTime(
         soGioLamTrongThang,
         "nfEmpTime",
         "(*) Số giờ làm trong tháng 50-150 giờ!"
      );

   if (!isValid) return null;

   var employee = new Employee(
      maNhanVien,
      tenNhanVien,
      chucVu,
      heSoChucVu,
      luongCoBan,
      soGioLamTrongThang
   );

   return employee;
}

/**
 * Render table list employee
 * @param {*} data
 */
function renderTable(data) {
   var contentHTML = "";
   var rateEmp = "";
   var salEmp = 0;

   data.forEach((employee) => {
      // Check rate employee
      var timeWork = employee.soGioLamTrongThang;
      if (50 <= timeWork && timeWork < 80) {
         rateEmp = "Nhân viên trung bình";
      } else if (80 <= timeWork && timeWork < 100) {
         rateEmp = "Nhân viên khá";
      } else if (100 <= timeWork && timeWork < 130) {
         rateEmp = "Nhân viên giỏi";
      } else if (130 <= timeWork && timeWork < 150) {
         rateEmp = "Nhân viên xuất sắc";
      } else {
         rateEmp = "Không xếp loại";
      }

      // Check total salary employee
      switch (employee.heSoChucVu) {
         case 1:
            salEmp = employee.luongCoBan;
            break;
         case 2:
            salEmp = employee.luongCoBan * 2;
            break;
         case 3:
            salEmp = employee.luongCoBan * 3;
            break;
      }

      contentHTML += `
         <tr>
            <td>${employee.maNhanVien}</td>
            <td>${employee.tenNhanVien}</td>
            <td>${employee.chucVu}</td>
            <td>${employee.luongCoBan}</td>
            <td>${salEmp}</td>
            <td>${employee.soGioLamTrongThang}</td>
            <td>${rateEmp}</td>
            <td>
               <button class="btn btn-success" onclick="handleEdit(${employee.maNhanVien})">Sửa</button>
               <button class="btn btn-danger" onclick="handleDelete(${employee.maNhanVien})">Xóa</button>
            </td>
         </tr>
      `;
   });

   getEle("tblEmpList").innerHTML = contentHTML;
}

function fillForm(data) {
   getEle("empId").value = data.maNhanVien;
   // disable input
   getEle("empId").disabled = true;
   getEle("empName").value = data.tenNhanVien;
   getEle("empPst").value = data.heSoChucVu;
   getEle("empSalary").value = data.luongCoBan;
   getEle("empTime").value = data.soGioLamTrongThang;
}

/**
 * Reset Form
 */
function resetForm() {
   getEle("formEmp").reset();
}

/**
 * Add employee after click button add
 */
getEle("addEmpBtn").addEventListener("click", function () {
   var emp = getDataForm(true);

   if (emp) {
      callApi
         .addEmployee(emp)
         .then(function (result) {
            fetchListData();
            resetForm();
         })
         .catch(function (error) {
            console.log(error);
         });
   }
});

/**
 * Fill data to form after enter "Edit" button
 * @param {*} id
 */
function handleEdit(id) {
   getEle("updateEmpBtn").style.display = "block";
   getEle("addEmpBtn").style.display = "none";
   fetchData(id);
}

/**
 * Update employee after edit
 */
getEle("updateEmpBtn").addEventListener("click", function () {
   var emp = getDataForm(false);

   if (emp) {
      callApi
         .updateEmployee(emp)
         .then(function (result) {
            console.log(result.data);
            fetchListData();
            getEle("empId").disabled = false;
            getEle("updateEmpBtn").style.display = "none";
            getEle("addEmpBtn").style.display = "block";
            resetForm();
         })
         .catch(function (error) {
            console.log(error);
         });
   }
});

/**
 * Delete employee
 * @param {*} id
 */
function handleDelete(id) {
   callApi
      .deleteEmployee(id)
      .then(function (result) {
         console.log(result.data);
         fetchListData();
      })
      .catch(function (error) {
         console.log(error);
      });
}
