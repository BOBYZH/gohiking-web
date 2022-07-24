import demoapi from "axios/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import setDate from "date-fns/setDate";

const PersonalPageLogic = (info = null) => {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(info ? false : true);
  const [personalInfo, setpersonalInfo] = useState(info ? info : {});
  const [nameValidation, setnameValidation] = useState("");
  const [genderValidation, setgenderValidation] = useState("");
  const [phoneValidation, setphoneValidation] = useState("");
  const [birthValidation, setbirthValidation] = useState("");
  const [countyValidation, setcountyValidation] = useState("");

  useEffect(() => {
    if (!info) getPersonalInfo();
  }, [info]);
  const getPersonalInfo = async () => {
    let uid = 0;
    if (localStorage.getItem("userId")) {
      uid = localStorage.getItem("userId");
    } else {
      history.push({ pathname: "/signin" });
    }
    await demoapi.get("/api/user/" + uid).then(res => {
      setisLoading(false);
      console.log(res.data.users.name);
      setpersonalInfo(res.data);
    });
  };

  const handleNameChange = event => {
    const value = event.target.value;
    setpersonalInfo({
      ...personalInfo,
      users: { ...personalInfo.users, name: value }
    });
    if (value == "") {
      setnameValidation("姓名不可為空");
    } else {
      setnameValidation("");
    }
  };

  const handleSexChange = event => {
    const value = event.target.value;
    setpersonalInfo({
      ...personalInfo,
      users: { ...personalInfo.users, gender: value }
    });
    if (value == "男" || value == "女") {
      setgenderValidation("");
    } else {
      setgenderValidation("請填入 男 或 女");
    }
  };

  const handleTelChange = event => {
    const value = event.target.value;
    setpersonalInfo({
      ...personalInfo,
      users: { ...personalInfo.users, phone_number: value }
    });
    let reg = new RegExp(/^\d*$/).test(value);
    if (reg) {
      setphoneValidation("");
    } else {
      setphoneValidation("只允許數字");
    }
  };
  const handleBirthChange = date => {
    const value = date;
    setpersonalInfo({
      ...personalInfo,
      users: { ...personalInfo.users, birth: value }
    });
    if (!moment(date).isValid()) {
      setbirthValidation("請輸入正確格式日期");
    } else if (value > moment()) {
      setbirthValidation("請勿輸入未來日期");
    } else {
      setbirthValidation("");
    }
  };

  const handleCountyChange = event => {
    const value = event.target.value;
    setpersonalInfo({
      ...personalInfo,
      users: {
        ...personalInfo.users,
        county: { ...personalInfo.users.county, name: value }
      }
    });
  };
  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const updateInfo = async data => {
    setisLoading(true);
    let uid = 0;
    if (localStorage.getItem("userId")) {
      uid = localStorage.getItem("userId");
    } else {
      history.push({ pathname: "/signin" });
    }
    if (data.croppedImage) {
      let blob = await fetch(data.croppedImage).then(r => r.blob());
      const file = new File([blob], "1234567890.jpg", {
        lastModified: new Date(),
        type: "image/jpeg"
      });
      const b64 = await getBase64(file);
      data.croppedImage = b64;
    }
    return demoapi
      .put("/api/user/" + uid, {
        name: data.name,
        gender: data.gender,
        phone_number: data.phone_number,
        birth: moment(data.birth).format("YYYY-MM-DD"),
        image: data.croppedImage ? data.croppedImage : "",
        county: data.county,
        country_code_id: data.countryCode
      })
      .then(res => {
        return res.status;
      });
  };

  return {
    isLoading,
    personalInfo,
    handleNameChange,
    handleSexChange,
    handleTelChange,
    handleBirthChange,
    handleCountyChange,
    updateInfo,
    getPersonalInfo,
    validations: {
      nameValidation,
      genderValidation,
      phoneValidation,
      birthValidation,
      countyValidation
    }
  };
};
export default PersonalPageLogic;
