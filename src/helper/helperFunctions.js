import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";


export const sendFileToBackend = async (input, email, mobileScreenFlag) => {
 
  if (window.innerWidth >= 280 && window.innerWidth < 424) {
    console.log("RUNNING MOBILE");
    var opt = {
      margin: [0, 0, 0, 0],
      filename: "myfile.pdf",
      image: { type: "png", quality: 0.98 },
      enableLinks: true,
      html2canvas: {
        scale: 2,
        removeContainer: true,
        // dpi: 192,
        putOnlyUsedFonts: true,
        // pagesplit: false,
        // width: 900,
        // height: 1300,
        windowWidth: window.innerWidth + 2000,
        width: 900,
        
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      // pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // New Promise-based usage:

    const file = html2pdf()
      .from(input[0])
      .set(opt)
      .outputPdf("blob", `${Date.now()}.pdf`)
      .then((res) => {
        const formData = new FormData();
        formData.append("cv", res);
        formData.append("email", email);
        try {
          const response = axios({
            method: "post",
            url: process.env.REACT_APP_BASE_URL + "user/mail",
            data: formData,
          });
          console.log(response);
        } catch (e) {
          console.log(e, "<========= error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else if (window.innerWidth >= 425 && window.innerWidth < 768) {
    console.log("RUNNING TABLET");
    var opt = {
      margin: [0, 0, 0, 0],
      filename: `${Date.now()}.pdf`,
      image: { type: "png", quality: 0.98 },
      enableLinks: true,
      html2canvas: {
        scale: window.devicePixelRatio,
        // removeContainer: true,
        dpi: 92,
        putOnlyUsedFonts: true,
        // pagesplit: false,
        // width: 900,
        // height: 1300,
        logging: true,
        windowWidth: window.innerWidth,
        width: window.innerWidth + 250,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      // pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // New Promise-based usage:
    const file = html2pdf()
      .from(input[0])
      .set(opt)
      .outputPdf("blob", `${Date.now()}.pdf`)
      .then((res) => {
        const formData = new FormData();
        formData.append("cv", res);
        formData.append("email", email);
        try {
          const response = axios({
            method: "post",
            url: process.env.REACT_APP_BASE_URL + "user/mail",
            data: formData,
          });
          console.log(response);
        } catch (e) {
          console.log(e, "<========= error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    console.log("RUNNING laptop");
    var opt = {
      margin: [0, 0, 0, 0],
      filename: "myfile.pdf",
      image: { type: "png", quality: 0.98 },
      enableLinks: true,
      html2canvas: {
        scale: window.devicePixelRatio,
        // removeContainer: true,
        dpi: 92,
        putOnlyUsedFonts: true,
        // pagesplit: false,
        // width: 900,
        // height: 1300,
        logging: true,
        windowWidth: 1500,
        width: window.innerWidth + 100,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      // pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // New Promise-based usage:
    const file = html2pdf()
      .from(input[0])
      .set(opt)
      .outputPdf("blob", `${Date.now()}.pdf`)
      .then((res) => {
        const formData = new FormData();
        formData.append("cv", res);
        formData.append("email", email);
        try {
          const response = axios({
            method: "post",
            url: process.env.REACT_APP_BASE_URL + "user/mail",
            data: formData,
          });
          console.log(response);
        } catch (e) {
          console.log(e, "<========= error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    console.log("RUNNING DESKTOP");
    var opt = {
      margin: 0,
      filename: "myfile.pdf",
      image: { type: "png", quality: 0.98 },
      enableLinks: true,
      html2canvas: {
        scale: 2,
        removeContainer: true,
        dpi: 92,
        putOnlyUsedFonts: true,
        pagesplit: true,
        // width: 2000,
        // height: 3000,
        // sWidth: 2000,
        // sHeight: 3000,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // New Promise-based usage:
    const file = html2pdf()
      .from(input[0])
      .set(opt)
      .outputPdf("blob", `${Date.now()}.pdf`)
      .then((res) => {
        const formData = new FormData();
        formData.append("cv", res);
        formData.append("email", email);
        try {
          const response = axios({
            method: "post",
            url: process.env.REACT_APP_BASE_URL + "user/mail",
            data: formData,
          });
          console.log(response);
        } catch (e) {
          console.log(e, "<========= error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
