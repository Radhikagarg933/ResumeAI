// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;

const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

// Element references - initialized after DOM loads
let mainForm, firstnameElem, middlenameElem, lastnameElem, imageElem, designationElem, addressElem, emailElem, phonenoElem, summaryElem;
let nameDsp, imageDsp, phonenoDsp, emailDsp, addressDsp, designationDsp, summaryDsp, projectsDsp, achievementsDsp, skillsDsp, educationsDsp, experiencesDsp;
let aiStatusElem, aiCareerBriefElem;
let coverStatusElem, coverOutputElem, coverJobTitleElem, coverCompanyNameElem, coverJobDescElem, coverAchievementsElem;
let analyzerStatusElem, analyzerOutputElem, resumeUploadElem, analyzerTargetJobElem, analyzerContextElem;

// Initialize DOM elements after page loads
document.addEventListener('DOMContentLoaded', function() {
    mainForm = document.getElementById('cv-form');
    firstnameElem = mainForm.firstname;
    middlenameElem = mainForm.middlename;
    lastnameElem = mainForm.lastname;
    imageElem = mainForm.image;
    designationElem = mainForm.designation;
    addressElem = mainForm.address;
    emailElem = mainForm.email;
    phonenoElem = mainForm.phoneno;
    summaryElem = mainForm.summary;

    nameDsp = document.getElementById('fullname_dsp');
    imageDsp = document.getElementById('image_dsp');
    phonenoDsp = document.getElementById('phoneno_dsp');
    emailDsp = document.getElementById('email_dsp');
    addressDsp = document.getElementById('address_dsp');
    designationDsp = document.getElementById('designation_dsp');
    summaryDsp = document.getElementById('summary_dsp');
    projectsDsp = document.getElementById('projects_dsp');
    achievementsDsp = document.getElementById('achievements_dsp');
    skillsDsp = document.getElementById('skills_dsp');
    educationsDsp = document.getElementById('educations_dsp');
    experiencesDsp = document.getElementById('experiences_dsp');

    aiStatusElem = document.getElementById('ai_status');
    aiCareerBriefElem = document.getElementById('ai_career_brief');

    coverStatusElem = document.getElementById('cover_status');
    coverOutputElem = document.getElementById('cover_output');
    coverJobTitleElem = document.getElementById('cover_job_title');
    coverCompanyNameElem = document.getElementById('cover_company_name');
    coverJobDescElem = document.getElementById('cover_job_description');
    coverAchievementsElem = document.getElementById('cover_achievements');

    analyzerStatusElem = document.getElementById('analyzer_status');
    analyzerOutputElem = document.getElementById('analyzer_output');
    resumeUploadElem = document.getElementById('resume_upload');
    analyzerTargetJobElem = document.getElementById('analyzer_target_job');
    analyzerContextElem = document.getElementById('analyzer_context');

    getUserInputs();
});

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    // first loop deals with the no of repeaters value
    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes 
        for(let j = 0; j < elemsAttrsCount; j++){
            // setting the key name for the object and fill it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    // achivements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // experiences
    let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};

function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}

const displayCV = (userData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

// generate CV
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

function previewImage(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function(ofEvent){
        imageDsp.src = ofEvent.target.result;
    }
}

const setAIStatus = (message, isError = false) => {
    if (!aiStatusElem) return;
    aiStatusElem.textContent = message;
    aiStatusElem.style.color = isError ? '#d9534f' : '#28a745';
}

// ============ GROQ API INTEGRATION ============
// Groq API Key - Hardcoded (Keep this secret!)
const GROQ_API_KEY = '';
const createGroqRequest = async (prompt, maxTokens = 1024) => {
    if (!GROQ_API_KEY || !GROQ_API_KEY.startsWith('gsk_')) {
        throw new Error('Groq API key not configured. Update GROQ_API_KEY in app.js');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage = errorBody.error?.message || `HTTP ${response.status}`;
        throw new Error(`Groq API error: ${errorMessage}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim();
};

const generateAISummary = async () => {
    setAIStatus('Generating summary...', false);
    const careerBrief = aiCareerBriefElem?.value.trim();

    if (!careerBrief) {
        setAIStatus('Enter your career brief first.', true);
        return;
    }

    const prompt = `Write a professional resume summary (2-3 lines/sentences) for:\n\n${careerBrief}\n\nKeep it concise and impactful. Do not include the person's name.`;

    try {
        const result = await createGroqRequest(prompt, 200);
        if (result) {
            summaryElem.value = result;
            generateCV();
            setAIStatus('Summary generated successfully.');
        } else {
            setAIStatus('AI returned no summary.', true);
        }
    } catch (error) {
        setAIStatus(error.message, true);
    }
};

const suggestAISkills = async () => {
    setAIStatus('Suggesting skills...', false);
    const careerBrief = aiCareerBriefElem?.value.trim();

    if (!careerBrief) {
        setAIStatus('Enter your career brief first.', true);
        return;
    }

    const prompt = `Based on this career brief, list 6-8 resume skills separated by commas.\n\n${careerBrief}\n\nRespond with ONLY the comma-separated list of skills. Do not include any introduction, numbering, explanation, or closing remarks.`;

    try {
        const result = await createGroqRequest(prompt, 200);
        if (result) {
            const skills = result.split(/,|\n/)
                .map(skill => skill.trim())
                // strip leading numbering/bullets like "1.", "1)", "-", "*"
                .map(skill => skill.replace(/^[\d]+[.)]\s*|^[-*•]\s*/, '').trim())
                .filter(Boolean)
                // drop preamble/closing lines (e.g. "Here are 6 skills:") which tend to be
                // full sentences rather than short skill labels
                .filter(skill => skill.split(' ').length <= 4 && !/^(here|these|based|sure|the following|skills?:?$)/i.test(skill))
                .slice(0, 8);

            const skillsContainer = document.querySelector('[data-repeater-list="group-e"]');
            if (skillsContainer) {
                skillsContainer.innerHTML = '';
                skills.forEach(skill => {
                    const item = document.createElement('div');
                    item.setAttribute('data-repeater-item', '');
                    item.classList.add('cv-form-row', 'cv-form-row-skills');
                    item.innerHTML = `
                        <div class="form-elem">
                            <label class="form-label">Skill</label>
                            <input name="skill" type="text" class="form-control skill" value="${skill}" onkeyup="generateCV()">
                            <span class="form-text"></span>
                        </div>
                        <button data-repeater-delete type="button" class="repeater-remove-btn">-</button>
                    `;
                    skillsContainer.appendChild(item);
                });
                generateCV();
                setAIStatus('Skills suggested successfully.');
            } else {
                setAIStatus('Could not find skills list container.', true);
            }
        } else {
            setAIStatus('AI returned no skills.', true);
        }
    } catch (error) {
        setAIStatus(error.message, true);
    }
};

// print CV
function printCV(){
    window.print();
}

// ============ COVER LETTER GENERATOR ============
const setCoverStatus = (message, isError = false) => {
    if (!coverStatusElem) return;
    coverStatusElem.textContent = message;
    coverStatusElem.style.color = isError ? '#d9534f' : '#28a745';
};

const generateCoverLetter = async () => {
    setCoverStatus('Generating cover letter...', false);
    
    const jobTitle = coverJobTitleElem?.value.trim();
    const companyName = coverCompanyNameElem?.value.trim();
    const jobDesc = coverJobDescElem?.value.trim();
    const achievements = coverAchievementsElem?.value.trim();

    if (!jobTitle || !companyName || !jobDesc) {
        setCoverStatus('Please fill in job title, company name, and job description.', true);
        return;
    }

    const firstName = firstnameElem?.value.trim();
    const lastName = lastnameElem?.value.trim();
    const email = emailElem?.value.trim();
    const phone = phonenoElem?.value.trim();

    const prompt = `Write a professional and compelling cover letter with the following details:
    
Applicant Name: ${firstName} ${lastName}
Position: ${jobTitle}
Company: ${companyName}
Email: ${email}
Phone: ${phone}

Job Description/Requirements:
${jobDesc}

Key Achievements to Highlight:
${achievements || 'General professional experience'}

Create a personalized cover letter that:
- Opens with enthusiasm about the specific role
- Highlights relevant skills matching the job description
- Uses professional but engaging tone
- Closes with a strong call to action
- Is approximately 250-300 words`;

    try {
        const result = await createGroqRequest(prompt, 800);
        if (result) {
            if (coverOutputElem) coverOutputElem.value = result;
            setCoverStatus('Cover letter generated successfully!');
        } else {
            setCoverStatus('AI returned no cover letter.', true);
        }
    } catch (error) {
        setCoverStatus(error.message, true);
    }
};

const copyCoverLetter = () => {
    if (!coverOutputElem || !coverOutputElem.value) {
        setCoverStatus('No cover letter to copy.', true);
        return;
    }
    navigator.clipboard.writeText(coverOutputElem.value).then(() => {
        setCoverStatus('Cover letter copied to clipboard!');
    }).catch(() => {
        setCoverStatus('Failed to copy to clipboard.', true);
    });
};

const printCoverLetter = () => {
    if (!coverOutputElem || !coverOutputElem.value) {
        setCoverStatus('No cover letter to print.', true);
        return;
    }

    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
        <html>
        <head>
            <title>Cover Letter</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    line-height: 1.6;
                    white-space: pre-wrap;
                }
            </style>
        </head>
        <body>
            <h2>Cover Letter</h2>
            <div>${coverOutputElem.value.replace(/\n/g, "<br>")}</div>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    setCoverStatus('Print dialog opened!');
};