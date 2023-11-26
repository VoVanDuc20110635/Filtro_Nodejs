$(document).ready(function () {
    $("table .delete").on("click", function () {
      alert("hihi");
      const id = $(this).parent().find("#id").val();
      $("#deleteBillingModal #deleteOrderId").val(id);
    });
  });
  s