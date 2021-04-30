import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();

  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();

  const selectFile = (e) => {
    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.readAsDataURL(file);
    reader.onloaded = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadImageAPI = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <React.Fragment>
      <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
      <button onClick={uploadImageAPI}>사진 올리기</button>
    </React.Fragment>
  );
};

export default Upload;
