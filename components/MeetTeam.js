import React from 'react';
import Link from 'next/link';
// import Person from "../components/Person";
import TeamCard from "../components/TeamCard";

const MeetTeam = () => {
       const Team = [
                     {imgSrc: "/assets/images/shad (3).svg", name: "Shadman Hossain", title: "Chief Innovation Officer"},
                     {imgSrc: "/assets/images/tahmid (1).svg", name: "Tahmid Biswas", title: "VP of Finance"},
                     {imgSrc: "/assets/images/jillian.jpg", name: "Jillian Lynch", title: "Hackathon Sponsorship Coordinator"},
                     {imgSrc: "/assets/images/roshaan (1).svg", name: "Roshaan Khan", title: "Product/Strategy"},
                     {imgSrc: "/assets/images/gideon.jpg", name: "Gideon Nnalue", title: "Software Engineer"},
                    //  {imgSrc: "/assets/images/Delawit.svg", name: "Delawit Assefa", title: "UI/UX Designer"},
                    //  {imgSrc: "/assets/images/Edward.svg", name: "Edward Torres", title: "UI/UX Designer"},
                     {imgSrc: "/assets/images/Bryanna.svg", name: "Bryanna Turman", title: "Social Media Manager"},
                     {imgSrc: "/assets/images/jack.jpg", name: "Jack Vandemeulebroecke", title: "Software Engineer & Instructor"},
                     {imgSrc: "/assets/images/SEEF.svg", name: "Seef Manj", title: "Technical Recruiter"},
                    //  {imgSrc: "/assets/images/Berket.svg", name: "Berket Yemaneberhane", title: "Investment Analyst"},
                    //  {imgSrc: "/assets/images/Minhazul.svg", name: "Minhazul Anas", title: "Investment Analyst"},

                     {imgSrc: "/assets/images/kirsten.svg", name: "Kirsten Pomales Langenbrunner", title: "Blockchain Advisor"},
                    //  {imgSrc: "/assets/images/Rami.svg", name: "Rami Abouemira", title: "People Advisor"},
                    //  {imgSrc: "/assets/images/marc.jpg", name: "Marc Duny", title: "Outreach Coordinator"},
                    //  {imgSrc: "/assets/images/.svg", name: "", title: ""},
                    // {imgSrc: "/assets/images/ryan.svg", name: "Ryan Talbot", title: "Software Engineer Intern"},
                     {imgSrc: "/assets/images/Seemaab.svg", name: "Seemaab Mujtaba", title: "Software Engineer Intern"},
                     {imgSrc: "/assets/images/sarah.svg", name: "Sarah Farang", title: "Software Engineer Intern"},

                    //  {imgSrc: "/assets/images/Cedrick.svg", name: "Cedrick Mupenzi", title: "Software Engineer Intern"},
                    // {imgSrc: "/assets/images/Curtis.svg", name: "Curtis Simpson", title: "Software Engineer Intern"},
                    // {imgSrc: "/assets/images/Yutian.svg", name: "Yutian Zhang", title: "Software Engineer Intern"},
                    // {imgSrc: "/assets/images/Oleg.svg", name: "Oleg Nosyrev", title: "Front End Developer Intern"},
//                     {imgSrc: "/assets/images/wesley.svg", name: "Wesley Luong", title: "Web Development Intern"},
                    {imgSrc: "/assets/images/yixuan.svg", name: "Yixuan Feng", title: "Web Development Intern"},
//                     {imgSrc: "/assets/images/fahad.svg", name: "Fahad Zakir", title: "Software Engineer Intern"},
                    // {imgSrc: "/assets/images/AbdelRahman.svg", name: "Abdel-Rahman Gad", title: "Software Engineer Intern"},
                    // {imgSrc: "/assets/images/Aileen.svg", name: "Aileen Wei", title: "Software QA"},
                    // {imgSrc: "/assets/images/Nalya.svg", name: "Nalya Shakirova", title: "Software QA"},
                    // {imgSrc: "/assets/images/Salma.svg", name: "Salma Khairat", title: "Software QA Intern"},
                    //  {imgSrc: "/assets/images/bridget.svg", name: "Bridget Shannon", title: "Web Development Intern"},
//                      {imgSrc: "/assets/images/shengqi.svg", name: "Shengqi Zhou", title: "Business Development Intern"},
                     {imgSrc: "/assets/images/Yudi.svg", name: "Yudi Fitriansyah", title: "Business Analyst Intern"},
                     {imgSrc: "/assets/images/daniel.svg", name: "Daniel Kleiman", title: "Non-Profit Development"},
                    //  {imgSrc: "/assets/images/adam.svg", name: "Adam Abdelaziz", title: "Grant Researcher Intern"},
                    // {imgSrc: "/assets/images/Johnathan.svg", name: "Jonathan Kung", title: "Cryptocurrency/ Blockchain R&D Intern"},
                    {imgSrc: "/assets/images/Kaleb.svg", name: "Kaleb Kendall", title: "Cryptocurrency/ Blockchain R&D Intern"},
                    {imgSrc: "/assets/images/vishal.svg", name: "Vishal Patil", title: "Cryptocurrency/ Blockchain R&D Intern"},
                    {imgSrc: "/assets/images/Jose.svg", name: "Jose Tollinchi", title: "Cryptocurrency/ Blockchain R&D Intern"},
                    // {imgSrc: "/assets/images/zed (2).svg", name: "Zvinodashe Mupambirei", title: "Cryptocurrency/ Blockchain R&D Intern"},
                    // {imgSrc: "/assets/images/Bhavini.svg", name: "Bhavini Kadiwala", title: "Data Science Intern"}, 
                    {imgSrc: "/assets/images/taylor.svg", name: "Taylor Sullivan", title: "Data Science Intern"}, 
                    {imgSrc: "/assets/images/zhengtong.svg", name: "Zhengtong Pan", title: "Data Science Intern"}, 
//                     {imgSrc: "/assets/images/sagar.svg", name: "Sagar Limbu", title: "Data Science Intern"}, 
                    // {imgSrc: "/assets/images/Stella.svg", name: "Stella Zhou", title: "Data Science Intern"}, 
                    {imgSrc: "/assets/images/israel.svg", name: "Israel Medina", title: "Graphic Design"},
                    {imgSrc: "/assets/images/anuge.svg", name: "Emmanuel Anuge ", title: "Graphic Design"},
                    // {imgSrc: "/assets/images/Violet.svg", name: "Violet Cerritelli", title: "People Operations"},
                    {imgSrc: "/assets/images/Maazin.svg", name: "Maazin Ahmed", title: "People Operations"},


                    //  {imgSrc: "/assets/images/kush.jpg", name: "Kush Gupta", title: "JMU Chapter President"},
                    //  {imgSrc: "/assets/images/abel.jpg", name: "Abele Aynekulu", title: "JMU Chapter Vice-President"},
                     {imgSrc: "/assets/images/james.jpg", name: "Professor Jim Jewett", title: "JMU COB Faculty Advisor"},
                     {imgSrc: "/assets/images/ramon.jpg", name: "Dr. Ramon Mata-Toledo", title: "JMU CS Faculty Advisor"},
                    //  {imgSrc: "/assets/images/michelle.jpg", name: "Michelle Wong", title: "JMU Chapter Treasurer"},
                    //  {imgSrc: "/assets/images/grace.jpg", name: "Grace Bailey", title: "JMU Chapter Professional Development Coordinator"},
                     {imgSrc: "/assets/images/myles.jpg", name: "Myles Patterson", title: "Chapter Events Coordinator"}];
    return (
        // <Person></Person>
        <section id="team" className="team-one team-page">
            <div className="container">
            <div className="block-title text-center">
                    <h2 className="block-title__title">Meet the <br />
                        Team</h2>
                </div>
                <div className="row">
                  {Team.map((team, index) => ( 
                <TeamCard  item={team} key={index}/>
                ))}
                </div>
            </div>
        </section>
    );
};

export default MeetTeam;
