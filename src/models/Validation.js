function Validation() {
   this.checkEmpty = function (value, spanId, mess) {
      if (value == "") {
         getEle(spanId).style.display = "block";
         getEle(spanId).innerHTML = mess;
         return false;
      }

      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
   };

   this.checkIdDigit = function (value, spanId, mess) {
      var num = /^[0-9]{4,6}$/;

      if (num.test(value)) {
         getEle(spanId).style.display = "none";
         getEle(spanId).innerHTML = "";
         return true;
      }

      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
   };

   this.checkNumberDigit = function (value, spanId, mess) {
      var num = /^[0-9]*$/;

      if (num.test(value)) {
         getEle(spanId).style.display = "none";
         getEle(spanId).innerHTML = "";
         return true;
      }

      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
   };

   this.checkIdDuplicate = function (value, spanId, mess, arr) {
      var exist = false;

      for (var i = 0; i < arr.length; i++) {
         var emp = arr[i];
         if (emp.maNhanVien === value) {
            exist = true;
            break;
         }
      }

      if (exist) {
         getEle(spanId).style.display = "block";
         getEle(spanId).innerHTML = mess;
         return false;
      }

      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
   };

   this.checkCharacterString = function (value, spanId, mess) {
      var letter =
         "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
         "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
         "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

      if (value.match(letter)) {
         getEle(spanId).style.display = "none";
         getEle(spanId).innerHTML = "";
         return true;
      }

      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
   };

   this.checkSalary = function (value, spanId, mess) {
      if (1000000 <= value && value <= 20000000) {
         getEle(spanId).style.display = "none";
         getEle(spanId).innerHTML = "";
         return true;
      }

      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
   };

   this.checkWorkTime = function (value, spanId, mess) {
      if (50 <= value && value <= 150) {
         getEle(spanId).style.display = "none";
         getEle(spanId).innerHTML = "";
         return true;
      }

      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
   };
}
