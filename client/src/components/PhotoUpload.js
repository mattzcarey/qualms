const PhotoUpload = ({ setFile, setFileName }) => {
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="App">
      <input type="file" onChange={saveFile} />
    </div>
  );
};

export default PhotoUpload;
