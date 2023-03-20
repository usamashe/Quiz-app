import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <Typography variant="subtitle1" style={{ color: "#cecece" }}>
        App made by
      </Typography>
      <Typography variant="h5" style={{ color: "white" }}>
        Usama Iftikhar
      </Typography>
      <div className={styles.social}>
        <a
          href="https://github.com/usamashe/Quiz-app.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon
            style={{ color: grey[50], fontSize: 30 }}
            className={styles.socialIcon}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
