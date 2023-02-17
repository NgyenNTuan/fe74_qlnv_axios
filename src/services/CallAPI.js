function CallAPI() {
   this.fetchEmployees = function () {
      return axios({
         url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
         method: "GET",
      });
   };

   this.fetchEmployee = function (id) {
      return axios({
         url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${id}`,
         method: "GET",
      });
   };

   this.addEmployee = function (employee) {
      return axios({
         url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
         method: "POST",
         data: employee,
      });
   };

   this.updateEmployee = function (employee) {
      return axios({
         url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${employee.maNhanVien}`,
         method: "PUT",
         data: employee,
      });
   };

   this.deleteEmployee = function (id) {
      return axios({
         url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`,
         method: "DELETE",
      });
   };
}
