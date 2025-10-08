import MyFooter from "../Footer/MyFooter";

export default function FooterPage() {
  return (
    <div className="footer">
      <h2 style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        Footer Section
      </h2>
      <MyFooter
        author="MinhLe"
        email="minhlvde170709@fpt.edu.vn"
        linkGithub="https://github.com/coren-007/FER202"
      />
    </div>
  );
}