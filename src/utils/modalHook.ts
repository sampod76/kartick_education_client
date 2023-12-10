import Swal from "sweetalert2";

export const confirm_modal = (message:string,confirmText:string="Yes, delete it!") => {
  return Swal.fire({
    title: "Are you sure?",
    text:message|| "You cannot restore this information!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: "cancle",
  });
};

export const Success_model = (message:string) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message || "Successfully!!!",
    showConfirmButton: false,
    timer: 2000,
  });
};

export const Error_model_hook = (message:string) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message || "সমস্যা হয়েছে!",
    footer: '<a href="">Why do I have this issue?</a>',
  });
};
