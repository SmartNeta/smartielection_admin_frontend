
// import Vue from "vue";
import axios from 'axios';

var serverApiEndPoint = "http://13.233.175.188:8585/open/sampark/api";
var serverApiEndPointLogin = "http://13.233.175.188:8585/open/rest";
var serverApiEndPointOpen = 'http://13.233.175.188:8585/open';

// var serverApiEndPoint = "http://localhost:8585/open/sampark/api";
// var serverApiEndPointLogin = "http://localhost:8585/open/rest";
// var serverApiEndPointOpen = "http://localhost:8585/open";


export const login = (user) => {
	let form = new FormData();
	form.append("username", user.username);
	form.append("password", user.password);
	return axios.post(serverApiEndPointLogin + '/login', form)
	.then((res) => {
        return res.data;
	}).catch(e => {
		return 500;
    })
}

export const getAll = (classType) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  {"Authorization" : token};
		
	return axios.get(serverApiEndPoint + '/grid/' + classType, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const saveNew = (classType, obj) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
		
	return axios.post(serverApiEndPoint + '/save/' + classType, obj,  {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const update = (classType, obj) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
		
	return axios.put(serverApiEndPoint + '/save/' + classType + '/' + obj.id, obj, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}




export const deleteById = (classType,id) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.delete(serverApiEndPoint + '/delete/' + classType + '/' + id, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const deleteVolunteerById = (id) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/deleteVolunteerById/' + id, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}


export const saveCsvFile = (file,state) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	
	let form = new FormData();
	form.append("file", file);
	form.append("state",state);
	return axios.post( serverApiEndPoint + '/upload-csv', form, { headers: { 'Content-Type': 'multipart/form-data',"Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}


export const getCitizensData = (id,filterBy,page,size,filterMap) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/citizensData/' + id + '/' + filterBy + '/' + page + '/' + size,filterMap, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getWard = (page,size) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getWard/'+page+'/'+size, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getBooth = (page,size) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getBooth/'+page+'/'+size, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getAssemblyConstituency = (page,size) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getAssemblyConstituency/'+page+'/'+size, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}


export const saveLogoImage = (file) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	
	let form = new FormData();
	form.append("file", file);
	return axios.post( serverApiEndPoint + '/upload-logo', form, { headers: { 'Content-Type': 'multipart/form-data' , "Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}

export const saveImageFile = (file) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	
	let form = new FormData();
	form.append("file", file);
	return axios.post( serverApiEndPoint + '/upload-image', form, { headers: { 'Content-Type': 'multipart/form-data' , "Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}

export const saveImageFiles = (files) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	
	const form = new FormData();

	for(var i = 0; i < files.length; i++) {
	 form.append('files', files[i]);
	}

	return axios.post( serverApiEndPoint + '/upload-images', form, { headers: {"Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}

export const getLogoImage = () =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get( serverApiEndPoint + '/download-logo', { headers: {"Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}

export const uploadHierarchyCsvFile = (file, stateAssemblyId) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	
	let form = new FormData();
	form.append("file", file);
	form.append("stateAssemblyId", stateAssemblyId);
	return axios.post( serverApiEndPoint + '/upload-hierarchy-csv', form, { headers: { 'Content-Type': 'multipart/form-data' , "Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}

export const downloadFile = (file) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var url = serverApiEndPoint + '/download-image/' + file
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.response.size > 0) {
	  		var blob = new Blob([this.response],{type: "text/plain;charset=utf-8;"});
        	if (window.navigator.msSaveBlob) { // IE
                window.navigator.msSaveOrOpenBlob(blob, file);
            } else { // other browser
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = file;
				link.click();
            }
        }
        return this.response.size;
    };
    xhr.setRequestHeader("Authorization", token); 
    xhr.send();
}


export const saveNewRoleAction= (securityGroupId, securityActionId, checked) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};	
	return axios.get(serverApiEndPointOpen + '/permission/security-group/update/'+securityGroupId+'/'+securityActionId+'/'+checked, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getSecurityGroup= (groupId) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};	
	return axios.get(serverApiEndPointOpen + '/permission/security-group/permissionList/'+ groupId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const updateRole = (role) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.put(serverApiEndPoint + '/save/SecurityGroup/' + role.id, role, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const sendUserNotification = (userId) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/send-user-notification/' + userId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getComplaintByUser = (userId) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/complaintByUser/' + userId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const complaintByState = () => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/complaintByState', {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const userByState = () => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/userByState/', {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getComplaintChart = (year,dept,subDept,ward) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getComplaintChart/' + year +'/'+ dept +'/'+ subDept + '/' + ward , {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getComplaintChartByDepartment = (deptId, wardId) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getComplaintChartByDept/'+ deptId + '/' + wardId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getComplaintChartByDepartmentBydates = (deptId,wardId,startDate,endDate) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getComplaintChartByDept/'+ deptId + '/' + wardId + '/' + startDate + '/' + endDate , {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getComplaintsAverage = (id, filterBy) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getComplaintsAverage/'+ id + '/' + filterBy, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })

}

export const saveNewComplaint = (complaint) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/saveComplaint', complaint, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getFilteredData = (className,id) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getFilteredData/' + className+ '/' +id, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getFilteredByState = (id) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getFilteredSurveyQuestion/'+id, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getFilteredSubDepartment = (id) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getFilteredSubDept/' + id , {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getComplaintsHistory = (deptId, subDeptId, wardId, filterBy) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getComplaintsHistory/' + deptId + '/' + subDeptId + '/' + wardId + '/' + filterBy, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getCitizenByVoterId = (voterId) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/citizensByVoterId/'+ voterId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getVolunteersData = (id, filterDataBy) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + "/" + id + '/getVolunteersData?filterDataBy=' + filterDataBy, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const exportCSV = () => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/exportCSV/', {headers : auth_header})
	.then((res) => {
		const url = window.URL.createObjectURL(new Blob([res.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Complaint.csv');
		document.body.appendChild(link);
		link.click();
	}).catch(e => {
		return e;
    })
}

export const getUserLoginDetail = (id,filterBy) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getUserLoginDetail/'+ id + '/' + filterBy, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const boothByCitizenCount= (booth) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/boothByCitizenCount/'+ booth, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const noOfPersonsPerHouse= (id,filterBy,page,size) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/number-of-voters-per-house/'+ id + '/' + filterBy + '/' + page+ '/' + size, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const noOfPersonsPerHouseCSV= (id,filterBy) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/number-of-voters-per-house-csv/'+ id + '/' + filterBy, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const assemblyConstituencyByState= (state) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/assemblyConstituencyByState/'+ state, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const saveApplicationSettings = (obj) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
		
	return axios.post(serverApiEndPoint + '/save-application-settings', obj,  {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getApplicationSettings = () => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
		
	return axios.get(serverApiEndPoint + '/getApplicationSettings',  {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const saveVolunteer = (obj) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
		
	return axios.post(serverApiEndPoint + '/volunteer/update', obj,  {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const partyByState= (state) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/partyByState/'+state, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPieChartByState = (data) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/getPieChartCitizenMobile', data, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPieChartByStateSegmentation = (data) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/getPieChartCitizenSegmentation',data, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPieChartByStateMaleFemale = (data) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/getPieChartCitizenMaleFemale',data, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPieChartByWardMaleFemale = (ward) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getPieChartCitizenMobileByWardMaleFemale/'+ward, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPieChartByStatePartyPreference = (data) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/getPieChartPartyPreference',data, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getScatterChartByState = (data) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/getScatterChartByState',data, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPieChartVolunteerBystate = (state) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getPieChartVolunteerBystate/'+state, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPieChartVolunteerByAssembky = (assembly) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getPieChartVolunteerByAssembky/'+assembly, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getQuestionSurveyChart = (id, filterBy) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getQuestionSurveyChart/' + id +'/'+ filterBy , {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const downloadPDFReport = (apiUrl, id, fileName) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var url = serverApiEndPoint + apiUrl + '/' + id;
    var xhr = new XMLHttpRequest();
    $("#progressBar").show();
    xhr.open("GET", url, true);
    xhr.responseType = "json";

    xhr.onload = function (result) {

   //  	if(this.response.pdf){
	  //   	var a = document.querySelector("#downloadPDF");
   //  		var img = document.querySelector("#myFrame");
   //  		var byteArrayPDF = base64ToArrayBuffer(this.response.pdf);
	  // 		var blobPDF = new Blob([byteArrayPDF],{type: "application/pdf;"});
			// img.data = window.URL.createObjectURL(blobPDF);
			// a.href = window.URL.createObjectURL(blobPDF);
			// a.download = fileName + ".pdf";
   //  	}

   			setTimeout(function(){
   	  			$("#myFrame").prop("data", serverApiEndPointOpen + "/Report");
   			},5);
			$("#downloadPDF").prop("href", serverApiEndPointOpen + "/download-report?fileName="+ fileName + ".pdf" );


	    	var a_excel = document.querySelector("#downloadExcel");
	    	a_excel.href = serverApiEndPointOpen + "/download-report-excel?fileName="+ fileName + ".xls";
	    	a_excel.download = fileName + ".xls";

   //  	if(this.response.excel){
	  //   	var byteArrayExcel = base64ToArrayBuffer(this.response.excel);
	  //   	var a_excel = document.querySelector("#downloadExcel");
	  // 		var blobExcel = new Blob([byteArrayExcel], {type: 'application/vnd.ms-excel'});
			// a_excel.href = window.URL.createObjectURL(blobExcel);
	  //   	a_excel.download = fileName + ".xls";
   //  	}
		$("#progressBar").hide();
		$("#reportView").show();
    };
    xhr.setRequestHeader("Authorization", token); 
    xhr.send();
}

function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

export const parliamentaryConstituencyByState = (state) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/parliamentaryConstituencyByState/' +state, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const sendMailChart = (data) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post( serverApiEndPoint + '/sendMail-chart/', data, { headers: { "Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}

export const getCitizenCSVFilesByState = (state) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getCitizenCSVFilesByState/' +state, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getCitizenLogFile = (fileObject,thisB) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var url = serverApiEndPoint + '/download-log-file/' + fileObject.id
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.response.size > 0) {
	  		var blob = new Blob([this.response],{type: "text/plain;charset=utf-8;"});
        	if (window.navigator.msSaveBlob) { // IE
                window.navigator.msSaveOrOpenBlob(blob, (fileObject.state + " "  + fileObject.id +" logFile.txt"));
            } else { // other browser
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = fileObject.state + " "  + fileObject.id +" logFile.txt";
				link.click();
            }
        } else {
        	thisB.showLogFileError();
        }
        return this.response.size;
    };
    xhr.setRequestHeader("Authorization", token); 
    xhr.send();
}

export const sendVolunteerNotification = (data) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/sendVolunteerNotification', data, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getVolunteerActions = (stateId) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/volunteerActions/' + stateId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getSegmentations = (stateId) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getSegmentations/' + stateId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const lastDayCountingBy = (apiUrl, id, fileName) => {
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var url = serverApiEndPoint + apiUrl + '/' + id;
    var xhr = new XMLHttpRequest();
    $("#progressBarOverview").show();
    xhr.open("GET", url, true);
    xhr.responseType = "json";

    xhr.onload = function (result) {

    	// if(this.response.pdf){
	    	//var a = document.querySelector("#downloadPDFOverview");
    		// var img = document.querySelector("#myFrameOverview");
    		// var byteArrayPDF = base64ToArrayBuffer(this.response.pdf);
	  		// var blobPDF = new Blob([byteArrayPDF],{type: "application/pdf;"});
   			setTimeout(function(){
   	  			$("#myFrameOverview").prop("data", serverApiEndPointOpen + "/Report");
   			},5);	  		
	  		// $("#myFrameOverview").prop("data", serverApiEndPointOpen + "/Report")
			// img.data = window.URL.createObjectURL(blobPDF);
			$("#downloadPDFOverview").prop("href", serverApiEndPointOpen + "/download-report?fileName="+ fileName + ".pdf" );
    	// }

	    	var a_excel = document.querySelector("#downloadExcelOverview");
	    	a_excel.href = serverApiEndPointOpen + "/download-report-excel?fileName="+ fileName + ".xls";
	    	a_excel.download = fileName + ".xls";

   //  	if(this.response.excel){
	  //   	var byteArrayExcel = base64ToArrayBuffer(this.response.excel);
	  //   	var a_excel = document.querySelector("#downloadExcelOverview");
	  // 		var blobExcel = new Blob([byteArrayExcel], {type: 'application/vnd.ms-excel'});
			// a_excel.href = window.URL.createObjectURL(blobExcel);
	  //   	a_excel.download = fileName + ".xls";
   //  	}
		$("#progressBarOverview").hide();
		$("#reportViewOverview").show();
    };
    xhr.setRequestHeader("Authorization", token); 
    xhr.send();
}

export const getTemplateFile = (templateName, fileName) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var url = serverApiEndPoint + '/getTemplate/' + templateName;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.response.size > 0) {
	  		var blob = new Blob([this.response],{type: "text/plain;charset=utf-8;"});
        	if (window.navigator.msSaveBlob) { // IE
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else { // other browser
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = fileName;
				link.click();
            }
        }
        return this.response.size;
    };
    xhr.setRequestHeader("Authorization", token); 
    xhr.send();
}

export const getVotersGoogleMapData = (filterObj) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/getVotersGoogleMapData', filterObj, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const approveVolunteer = (volunteer) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.post(serverApiEndPoint + '/approveVolunteer', volunteer, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })	
}


export const getVotersDataCSV = (filterBy) => {
	var today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
	var fileName = filterBy + " Voters- "+ today  +".csv";
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var url = serverApiEndPointOpen + '/getVotersDataCSV?fileName='+fileName;
	var link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	link.click();
}

export const getVotersCSV = (id, filterBy) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getVotersCSV/' + id + '/' + filterBy, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const savePreviousElectionData = (file, id, saveBasedOn) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	let form = new FormData();
	form.append("file", file);
	return axios.post( serverApiEndPoint + '/uploadPreviousElectionData/' + id + '/' + saveBasedOn , form, { headers: { 'Content-Type': 'multipart/form-data',"Authorization" : token }}).then((res) => {
		return res.data;
	}).catch(e => {
		console.log(e);
		return e;
    })
}

export const getPreviousUploadsByWard = (wardId) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getPreviousUploadsByWard/' + wardId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getPreviousUploadsByAssembly = (assemblyId) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getPreviousUploadsByAssembly/' + assemblyId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const downloadPreviousElectionFile = (fileObject) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var url = serverApiEndPoint + '/download-previous-election-file/' + fileObject.fileName
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.response.size > 0) {
	  		var blob = new Blob([this.response],{type: "text/plain;charset=utf-8;"});
        	if (window.navigator.msSaveBlob) { // IE
                window.navigator.msSaveOrOpenBlob(blob, fileObject.fileName);
            } else { // other browser
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = fileObject.fileName;
				link.click();
            }
        }
        return this.response.size;
    };
    xhr.setRequestHeader("Authorization", token); 
    xhr.send();
}

export const getSurveyQuestionsCSV = (filedType,stateId,dowloadType) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getSurveyQuestionsCSV/' + filedType +'/'+stateId + "?dowloadType="+dowloadType, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getSegmentationsList = (stateId) =>{
	var token = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : window.localStorage.getItem("auth_token");
	var auth_header =  { "Authorization" : token};
	return axios.get(serverApiEndPoint + '/getSegmentationsList/' + stateId, {headers : auth_header})
	.then((res) => {
		return res.data;
	}).catch(e => {
		return e;
    })
}

export const getServerApiPath = () => {
	return serverApiEndPointOpen;
}
