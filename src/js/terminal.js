let historyString = "";

$(".command").on("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    historyString += `C:\\Users\\vivek>${e.target.value}<br>`;
    console.log(historyString);

    switch (e.target.value.toLowerCase()) {
      case "help":
        historyString += `
        <table>
            <tr>
                <td>About</td>
                <td>Displays information about Vivek Rai</td>
            </tr>
            <tr>
                <td>Skills</td>
                <td>Displays skills owned.</td>
            </tr>
            <tr>
                <td>Objectives</td>
                <td>Displays objectives.</td>
            </tr>
            <tr>
                <td>Education</td>
                <td>Displays educational background.</td>
            </tr>
            <tr>
                <td>Projects</td>
                <td>Displays project built.</td>
            </tr>
            <tr>
                <td>Certificates</td>
                <td>Displays certifications.</td>
            </tr>
            <tr>
                <td>Achievements</td>
                <td>Displays achievements.</td>
            </tr>
        </table><br><br>`;
        break;
      case "about":
        historyString += `
        <table>
        <tr>
        <td>Name</td>
        <td>Vivek Rai</td>
      </tr>
  <tr>
    <td>Address</td>
    <td>Vigyan Nagar, Kota, 324005, India</td>
  </tr>
  <tr>
    <td>Phone</td>
    <td>+91 7340553117</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>vivek.rai.2807@gmail.com</td>
  </tr>
  <tr>
    <td>Date of Birth</td>
    <td>28 July 1999</td>
  </tr>
</table><br>`;
        break;
      case "skills":
        historyString += `<table>
            <tr>
              <td>JavaScript</td>
            </tr>
            <tr>
              <td>Java</td>
            </tr>
            <tr>
              <td>Python</td>
            </tr>
            <tr>
              <td>HTML5, CSS3</td>
            </tr>
            <tr>
              <td>Flutter Framework</td>
            </tr>
            <tr>
              <td>MySQL Database</td>
            </tr>
            <tr>
              <td>Git</td>
            </tr>
            <tr>
              <td>Information Security</td>
            </tr>
            <tr>
              <td>Technical Troubleshooting</td>
            </tr>
          </table><br>`;
        break;
      case "objective":
        historyString += `<table>
        
        <tr>
          <td>
            Motivated computer science postgraduate with a solid academic background and a keen interest in software development and technology, Seeking opportunities to apply theoretical knowledge gained during studies to practical, real-world projects. Eager to collaborate with industry professionals, contribute to innovative solutions, and further develop skills in programming, problem-solving, and teamwork, Dedicated to staying updated with the latest technological advancements and leveraging them to deliver efficient and impactful software solutions.
          </td>
        </tr>
      </table><br>`;
        break;
      case "education":
        historyString += `<table>
        
        <tr>
          <td>SSC, Sarvodaya Senior Secondary School</td>
          <td>2015</td>
          <td>10 CGPA</td>
        </tr>
        <tr>
          <td>HSC, Mayank Senior Secondary School</td>
          <td>2017</td>
          <td>85.80%</td>
        </tr>
        <tr>
          <td>Bachelor of Computer Application, Om Kothari Institute of Management & Research</td>
          <td>2021</td>
          <td>86.59%</td>
        </tr>
        <tr>
          <td>Master of Computer Application, University of Kota</td>
          <td>2023</td>
          <td>80%</td>
        </tr>
      </table><br>`;
        break;
      case "projects":
        historyString += `
        <table>
       
        <tr>
          <td>KrishiMitra - Plant Disease Detection Android Application</td>
        </tr>
        <tr>
          <td>Cryptority - Information Security Android Application</td>
        </tr>
        <tr>
          <td>BMI Calculator - Health Monitoring Android Application</td>
        </tr>
        <tr>
          <td>College Website</td>
        </tr>
      </table>
      
      <br>`;
        break;
      case "certificates":
        historyString += `<table>
    
    <tr>
      <td>Software Engineering Virtual Experience</td>
      <td>Oct 2022</td>
    </tr>
    <tr>
      <td>Problem Solving & Programming in Python & Website Designing</td>
      <td>Dec 2023</td>
    </tr>
  </table><br>`;
        break;
      case "achievements":
        historyString += `<table>
        <tr>
          <th>Achievements</th>
        </tr>
        <tr>
          <td>JPMorgan Chase & Co.</td>
        </tr>
        <tr>
          <td>Department of Computer Science & Informatics, University of Kota</td>
        </tr>
        <tr>
          <td>Hackerrank - Python 5 Star</td>
        </tr>
      </table><br>`;
        break;

      case "cls":
        historyString = "";
        break;

      default:
        historyString += `'${e.target.value}' is not recognized as an internal or external command,
        operable program or batch file.<br><br>`;
        break;
    }

    $(".history").html(historyString);
    $(".terminal")[0].scrollTop = $(".terminal")[0].scrollHeight;
    e.target.value = "";
  }
});
