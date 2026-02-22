

let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

//job counts
let total = document.getElementById('total');
let availableTotalCount = document.getElementById('availableJob-count')
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');


//cards sections
const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');


function calculateCount() {
    const totalJobs = allCardSection.children.length;
    total.innerText = totalJobs; //8
    // availableTotalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus == "all-filter-btn"){
        availableTotalCount.innerText = `${totalJobs}`;
    }
    else if (currentStatus == "interview-filter-btn"){
        availableTotalCount.innerText = `${interviewList.length} of ${totalJobs}`;
    }
    else if (currentStatus == "rejected-filter-btn"){
        availableTotalCount.innerText = `${rejectedList.length} of ${totalJobs}`;
    }
}
// calculateCount();


// filter buttons
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


function toggleStyle(id) {
    // adding white bg for all
    allFilterBtn.classList.add('btn-ghost', 'bg-white');
    interviewFilterBtn.classList.add('btn-ghost', 'bg-white');
    rejectedFilterBtn.classList.add('btn-ghost', 'bg-white');

    // if any button has primary then remove
    allFilterBtn.classList.remove('bg-[#3b82f6FF]', 'text-white');
    interviewFilterBtn.classList.remove('bg-[#3b82f6FF]', 'text-white');
    rejectedFilterBtn.classList.remove('bg-[#3b82f6FF]', 'text-white');

    currentStatus = id; // current status by default 'all'
    // console.log(currentStatus)

    const selected = document.getElementById(id);
    // console.log(selected);

    // adding primary to current button
    selected.classList.remove('btn-ghost', 'bg-white')
    selected.classList.add('bg-[#3b82f6FF]', 'text-white')
    // step 1 finish

    // filtering for each filter button (All, Interview, Rejected)
    if (id == 'interview-filter-btn') {

        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview();
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected();
    }
    calculateCount(); //refresh the right side job count show 
}



// step 2 delegation
mainContainer.addEventListener('click', function (event) {

    // when job card interview btn clicked 
    if (event.target.classList.contains('interview-btn'))
    {
        const parentNode = event.target.parentNode.parentNode;
        // console.log(parenNode);
        
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        // const status = parenNode.querySelector('.status-tag').innerText;
        const description = parentNode.querySelector('.description').innerText;

        parentNode.querySelector('.status-tag').innerText = 'APPLIED';
        parentNode.querySelector('.status-tag').classList.remove('status-default', 'status-rejected', 'status-interview');
        parentNode.querySelector('.status-tag').classList.add('status-interview');
        

        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'APPLIED',
            description
        }

        // varify if list already has that job card, if not then push
        const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName);

        if (!jobExist){
            interviewList.push(cardInfo);
        }
        // console.log(interviewList)

        // filter out the job from rejectedList if in it
        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName)

        // after removing re-render the rejcted tab html
        if (currentStatus == 'rejected-filter-btn') {
            renderRejected();
        }

        calculateCount();
        toggleStyle('interview-filter-btn');

    }

    // when job card rejected btn clicked
    else if (event.target.classList.contains('rejected-btn'))
    {
        const parentNode = event.target.parentNode.parentNode;
        // console.log(parenNode);
        
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        // const status = parenNode.querySelector('.status-tag').innerText;
        const description = parentNode.querySelector('.description').innerText;

        parentNode.querySelector('.status-tag').innerText = 'REJECTED';
        parentNode.querySelector('.status-tag').classList.remove('status-default', 'status-interview', 'status-rejected');

        parentNode.querySelector('.status-tag').classList.add('status-rejected');
        

        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'REJECTED',
            description
        }

        // varify if list already has that job card, if not then push
        const jobExist = rejectedList.find(item => item.companyName == cardInfo.companyName);

        if (!jobExist){
            rejectedList.push(cardInfo);
        }
        // console.log(rejectedList)


        // filter out the job from interviewList
        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)

        // after removing re-render the interview tab html
        if (currentStatus == 'interview-filter-btn') {
            renderInterview();
        }
        
        calculateCount();
        toggleStyle('rejected-filter-btn');

    }

    // when delete btn clicked
    else if(event.target.closest('.delete-button'))
    {   
        console.log('delete button clicked');



        deleteBtn = event.target.closest('.delete-button');
        deleteBtnParentCard = deleteBtn.parentNode.parentNode;

        
        const dltCardCompanyName = deleteBtnParentCard.querySelector('.companyName').innerText;

        console.log(dltCardCompanyName);

        

    }

})

// function for rendering interview tab
function renderInterview(){
    filterSection.innerHTML = '';

    if(interviewList.length === 0){
        let div = document.createElement('div');
        div.className = 'bg-base-100 py-28 px-10 flex flex-col items-center gap-5 text-center rounded-lg';

        div.innerHTML = `
        <div>
            <img src="./jobs.png" alt="" class="max-w-28">
        </div>

        <div>
            <h2 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h2>
            <p class="text-[#64748b]">Check back soon for new job opportunities</p>
        </div>
        `;
        filterSection.appendChild(div);

    }

    else {
    for (const interview of interviewList){
        
        let div = document.createElement('div');
        div.className = 'card p-6 shadow-sm flex flex-row justify-between bg-base-100 mb-4';

        div.innerHTML = `
            <!-- main part 1 -->
            <div class="space-y-5">
                <div>
                    <h3 class="companyName font-semibold text-lg text-[#002C5C] ">${interview.companyName}</h3>
                    <p class="position text-[#64748bFF]">${interview.position}</p>
                </div>


                <div class="flex text-[14px] gap-1 text-[#64748bFF]">
                    <p class="location">${interview.location}</p>•
                    <p class="type">${interview.type}</p>•
                    <p class="salary">$130,000 - $175,000<p>
                </div>

                <p class="status-tag badge py-4 px-3 rounded-[4px] status-interview">${interview.status}</p>
                <p class="description text-[14px] text-[#323b49FF]">${interview.description}</p>

                <div class="flex gap-2">
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>

                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>

            <!-- main part 2 -->
            <div>
                <button class="delete-button btn btn-circle">
                    <i class="fa-solid fa-trash-can" style="color: #64748b;"></i>
                </button>
            </div>
        `
        filterSection.appendChild(div);

        // toggle match status on the All cards tab
        const cards = Array.from(allCardSection.children);
        const previousStatusCard = cards.find(item => item.querySelector('.companyName').innerText == interview.companyName);

        // console.log(previousStatusCard);

        const updatedStatusTag = previousStatusCard.querySelector('.status-tag');
        updatedStatusTag.innerText = interview.status;
        updatedStatusTag.className = 'status-tag badge py-4 px-3 rounded-[4px] status-interview';
        // console.log(updatedStatusTag);
    
    }
    }
    calculateCount();
}


// function for rendering rejected tab
function renderRejected(){
    filterSection.innerHTML = '';

    if(rejectedList.length === 0){
        let div = document.createElement('div');
        div.className = 'bg-base-100 py-28 px-10 flex flex-col items-center gap-5 text-center rounded-lg';

        div.innerHTML = `
        <div>
            <img src="./jobs.png" alt="" class="max-w-28">
        </div>

        <div>
            <h2 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h2>
            <p class="text-[#64748b]">Check back soon for new job opportunities</p>
        </div>
        `;
        filterSection.appendChild(div);

    }

    else {
    for (const rejected of rejectedList){
        
        let div = document.createElement('div');
        div.className = 'card p-6 shadow-sm flex flex-row justify-between bg-base-100 mb-4';

        div.innerHTML = `
            <!-- main part 1 -->
            <div class="space-y-5">
                <div>
                    <h3 class="companyName font-semibold text-lg text-[#002C5C] ">${rejected.companyName}</h3>
                    <p class="position text-[#64748bFF]">${rejected.position}</p>
                </div>


                <div class="flex text-[14px] gap-1 text-[#64748bFF]">
                    <p class="location">${rejected.location}</p>•
                    <p class="type">${rejected.type}</p>•
                    <p class="salary">$130,000 - $175,000<p>
                </div>

                <p class="status-tag badge py-4 px-3 rounded-[4px] status-rejected">${rejected.status}</p>
                <p class="description text-[14px] text-[#323b49FF]">${rejected.description}</p>

                <div class="flex gap-2">
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>

                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>

            <!-- main part 2 -->
            <div>
                <button class="delete-button btn btn-circle">
                    <i class="fa-solid fa-trash-can" style="color: #64748b;"></i>
                </button>
            </div>
        `
        filterSection.appendChild(div);

        // toggle match status on the All cards tab
        const cards = Array.from(allCardSection.children);
        const previousStatusCard = cards.find(item => item.querySelector('.companyName').innerText == rejected.companyName);

        // console.log(previousStatusCard);

        const updatedStatusTag = previousStatusCard.querySelector('.status-tag');
        updatedStatusTag.innerText = rejected.status;
        updatedStatusTag.className = 'status-tag badge py-4 px-3 rounded-[4px] status-rejected';
        // console.log(updatedStatusTag);
    }
    }
    calculateCount();
}


