<template>
    <InfoSectionComponent caption="Integration Developer"
                          subcaption="PCL Construction | 2021 - Present"
                          info="Onboarded and integrated additional third-party sensors onto our IoT
        platform. Worked on various mission-critical frontend and backend
        features on PCL's Job Site Insights™, (JSI™) smart construction platform
        with Latium Technologies's IoT operating system." />
    <p>
        Links: <a href="https://latiumtech.com/job-site-insights/">Job Site Insights™</a>
    </p>
    <SVGLineComponent></SVGLineComponent>
    <InfoSectionComponent caption="Construction Technology Analyst"
                          subcaption="PCL Construction | 2021 - 2021"
                          info="Coordinated Business Technology initiatives and changes to existing
        systems and solutions. Primary technical support for VIPs and the
        Executive office. Subject Matter Expert (SME) for on-site technologies
        and solutions. Developed PowerShell scripts for process improvement to
        save valuable time and cost." />
    <p>
        Links: <a href="https://www.pcl.com/ca/en">PCL</a>
    </p>
    <SVGLineComponent></SVGLineComponent>
    <InfoSectionComponent caption="Student System Administrator"
                          subcaption="PCL Construction | 2020 - 2021"
                          info="First-level contact and problem resolution for hardware, software and
        applications. Administer and monitoring district office and technology
        solutions to ensure optimal operation. Knowledge management of on-site
        technology." />
    <p>
        Links: <a href="https://www.pcl.com/ca/en">PCL</a>
    </p>
    <SVGLineComponent></SVGLineComponent>
    <InfoSectionComponent caption="Research Assistant"
                          subcaption="H.O.M.E Lab, Sunway University | 2017 - 2017"
                          info="Developed a model, theory and algorithm by
        effectively combining haptic and audio feedback for user navigation and
        understanding of 3D objects for visually impaired individuals." />
    <p>
        Links: <a href="https://university.sunway.edu.my/set/facilities/HOME-lab">H.O.M.E Lab</a>
    </p>
</template>

<script>
import SVGLineComponent from "../components/SVGLine.vue";
import InfoSectionComponent from "../components/InfoSection.vue";

export default {
  name: "ExperienceView",
  components: {
    SVGLineComponent,
    InfoSectionComponent,
  },
};
</script>

<style scoped>
    a {
        color: white;
        text-decoration: underline;
    }
</style>