

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
        // renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        // renderStruggling()
    }
    calculateCount(); //refresh the right side job count show 
}



// step 2 delegation
mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn'))
    {
        const parenNode = event.target.parentNode.parentNode;
        // console.log(parenNode);
        
        const companyName = parenNode.querySelector('.companyName').innerText;
        const position = parenNode.querySelector('.position').innerText;
        const location = parenNode.querySelector('.location').innerText;
        const type = parenNode.querySelector('.type').innerText;
        const salary = parenNode.querySelector('.salary').innerText;
        // const status = parenNode.querySelector('.status-tag').innerText;
        const description = parenNode.querySelector('.description').innerText;

        parenNode.querySelector('.status-tag').innerText = 'INTERVIEWED';
        parenNode.querySelector('.status-tag').classList.remove('bg-[#eef4ffFF]');
        parenNode.querySelector('.status-tag').classList.add('bg-[#10B981]');
        

        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'INTERVIEWED',
            description
        }

        // varify if list already has that job card, if not then push
        const jobExist = interviewList.find(item => item.campanyName == cardInfo.companyName);

        if (!jobExist){
            interviewList.push(cardInfo);
        }
        // console.log(interviewList)

        renderInterview();

    }

})

function renderInterview(){
    filterSection.innerHTML = '';

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

                <p class="status-tag badge py-4 px-3 rounded-[4px] bg-[#10B981]">${interview.status}</p>
                <p class="description text-[14px] text-[#323b49FF]">${interview.description}</p>

                <div class="flex gap-2">
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>

                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>

            <!-- main part 2 -->
            <div>
                <button class="btn btn-circle">
                    <i class="fa-solid fa-trash-can" style="color: #64748b;"></i>
                </button>
            </div>
        `
        filterSection.appendChild(div);
        calculateCount();
    }
}