import Swal from "sweetalert2";

export const confirm_modal = (
  message: string,
  confirmText: string = "Yes"
) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message || "You cannot restore this information!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: "cancle",
  });
};

export const Success_model = (message: string) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message || "Successfully!!!",
    showConfirmButton: false,
    timer: 2000,
  });
};

export const Error_model_hook = (message: string) => {
  return Swal.fire({
    // icon: "error",
    icon: "question",
    title: "Oops...",
    text: message || "something  is wrong!!!!!",
    footer: '<a href="">Why do I have this issue?</a>',
  });
};
export const Animation_model_hook = (message: string) => {
  return Swal.fire({
    title: message || "Custom animation with Animate.css",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `,
    },
  });
};
