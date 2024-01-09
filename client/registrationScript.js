document.addEventListener('DOMContentLoaded', function() {
    const regTypeSelect = document.getElementById('regType');
    const individualFields = document.getElementById('individualFields');
    const teamFields = document.getElementById('teamFields');
    const numMembersInput = document.getElementById('numMembers');
    const teamMembersContainer = document.getElementById('teamMembersContainer');
    const paymentInput = document.getElementById('payment');
    const paymentButton = document.getElementById('payNow')
    const requestBody = {}

    function createMemberFields(memberNumber) {
        return `
            <fieldset>
                <legend>Member ${memberNumber}</legend>
                <div><label for="name${memberNumber}">Name:</label><input type="text" id="name${memberNumber}" name="name${memberNumber}" required></div>
                <div><label for="college${memberNumber}">College/University:</label><input type="text" id="college${memberNumber}" name="college${memberNumber}" required></div>
                <div><label for="usn${memberNumber}">USN:</label><input type="text" id="usn${memberNumber}" name="usn${memberNumber}" required></div>
                <div><label for="semester${memberNumber}">Semester:</label><input type="number" id="semester${memberNumber}" name="semester${memberNumber}" required></div>
                <div><label for="branch${memberNumber}">Branch:</label><input type="text" id="branch${memberNumber}" name="branch${memberNumber}" required></div>
                <div><label for="dob${memberNumber}">Date of Birth:</label><input type="date" id="dob${memberNumber}" name="dob${memberNumber}" required></div>
                <div><label for="phone${memberNumber}">Phone Number:</label><input type="tel" id="phone${memberNumber}" name="phone${memberNumber}" required></div>
                <div><label for="email${memberNumber}">Email Address:</label><input type="email" id="email${memberNumber}" name="email${memberNumber}" required></div>
            </fieldset>`;
    }

    function updateTeamMembers(numMembers) {
        teamMembersContainer.innerHTML = '';
        for (let i = 1; i <= numMembers; i++) {
            teamMembersContainer.innerHTML += createMemberFields(i);
        }
    }

    function updatePayment() {
        const feePerParticipant = 500;
        const numParticipants = regTypeSelect.value === 'team' ? parseInt(numMembersInput.value, 10) : 1;
        paymentInput.value = `Rs. ${feePerParticipant * numParticipants}`;
    }

    function getValueFromId(id) {
        console.log(id)
        console.log(document.getElementById(id).value)
        return document.getElementById(id).value
    }

    function createParticipant(i) {
        console.log(i)

        console.log({
            memberName: getValueFromId(`name${i}`),
            email: getValueFromId(`email${i}`),
            phone: getValueFromId(`phone${i}`),
            dob: new Date(getValueFromId(`dob${i}`)),
            semester: getValueFromId(`semester${i}`),
            usn: getValueFromId(`usn${i}`),
            organization: getValueFromId(`college${i}`)
        })
        return {
            memberName: getValueFromId(`name${i}`),
            email: getValueFromId(`email${i}`),
            phone: getValueFromId(`phone${i}`),
            dob: getValueFromId(`dob${i}`),
            semester: getValueFromId(`semester${i}`),
            usn: getValueFromId(`usn${i}`),
            organization: getValueFromId(`college${i}`)
        }
    }

    regTypeSelect.addEventListener('change', function() {
        if (this.value === 'team') {
            individualFields.style.display = 'none';
            teamFields.style.display = 'block';
            updateTeamMembers(numMembersInput.value);
        } else {
            individualFields.style.display = 'block';
            teamFields.style.display = 'none';

        }
        updatePayment();
    });

    numMembersInput.addEventListener('change', function() {
        updateTeamMembers(this.value);
        updatePayment();
    });

    paymentButton.addEventListener('click', (e) => {
        e.preventDefault()

        if (regTypeSelect.value !== 'team') {
            requestBody.teamName = `_${getValueFromId('name')}`
            requestBody.teamMembers = [{
                memberName: getValueFromId('name'),
                email: getValueFromId('email'),
                phone: getValueFromId('phone'),
                dob: new Date(getValueFromId('dob')),
                semester: getValueFromId('semester'),
                usn: getValueFromId('usn'),
                organization: getValueFromId('college')
            }]
        } else {
            requestBody.teamName = getValueFromId('teamName')
            for (let index = 1; index <= numMembersInput; index++) {
                console.log(2)
                requestBody.teamMembers = []
                requestBody.push(createParticipant(index))
            }
        }

        fetch('/api/v1/register', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    if (data.data.result.url)
                        window.location.replace(data.data.result.url);
                } else {
                    this.location.reload()
                }
            })

    })



    // Initialize with individual registration as default
    updatePayment();
});