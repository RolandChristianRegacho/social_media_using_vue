<template>
    <div @click="hideZoom($event)" id="grayBgDiv">
        <div class="editProfileDiv">
            <br>
            <br>
            <h1>Profile Information</h1>
            <br>
            <form @submit.prevent="submit">
                <img v-bind:src="user_info.profile_picture" id="imgProfile" width="200" height="200" />
                <input type="file" name="file" id="file" accept="image/*" @change="previewImage(this)" class="inputfile" />
                <label for="file">
                    <AnFilledEdit  class="icon" />
                </label>
                <input type="text" class="input-checker" id="profile_fname" placeholder="First Name" v-model="user_info.first_name" />
                <input type="text" class="input-checker" id="profile_mname" placeholder="Middle Name" v-model="user_info.middle_name" />
                <input type="text" class="input-checker" id="profile_lname" placeholder="Last Name" v-model="user_info.last_name" />
                <input type="date" class="input-checker" id="profile_bdate" placeholder="" v-model="user_info.birthday" />
                <button @click="updateInformation()">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import { getAxiosData, postImageData, updateAxiosData } from '@/additional_scripts/fetch-script';
import form_check, { date_setter } from '@/additional_scripts/form-checker';
import logout from '@/additional_scripts/logout';
import { AnFilledEdit  } from "@kalimahapps/vue-icons";
import $ from 'jquery';
export default {
    name: "EditProfilePage",
    components: {
        AnFilledEdit 
    },
    data() {
        return {
            user_info: {
                id: "",
                profile_picture: "",
                first_name: "",
                middle_name: "",
                last_name: "",
                birthday: ""
            }
        }
    },
    methods: {
        hideZoom(event) {
            if (event.target.nodeName == "BUTTON" || event.target.nodeName == "LABEL" || event.target.nodeName == "INPUT" || event.target.nodeName == "svg" || event.target.nodeName == "path") {
                return
            }
            $("#grayBgDiv").hide()
        },
        updateInformation() {
                let user = this.getCookie("user")

                if (user == "") {
                    logout(this.$swal, this.$router)
                }
                else {
                    this.user_info.id = JSON.parse(user).id
                }

                let formData = {}

                if ($('#file')[0].files.length == 0) {
                    formData = {
                        "user_id": this.user_info.id,
                        "first_name": this.user_info.first_name,
                        "middle_name": this.user_info.middle_name,
                        "last_name": this.user_info.last_name,
                        "birthday": this.user_info.birthday
                    }

                    let form_ver = form_check(formData)

                    if(form_ver.type == "fail") {
                        switch(form_ver.data.form) {
                            case "first_name": {
                                $("#profile_fname").focus()
                                $("#profile_fname").attr("class", "input-checker-fail")
                                break
                            }
                            case "last_name": {
                                $("#profile_lname").focus()
                                $("#profile_lname").attr("class", "input-checker-fail")
                                break
                            }
                        }
                        return 
                    }

                    updateAxiosData(`${this.BASE_URL}/home/users.php`, formData)
                        .then(result => {
                            if (result.type == "success") {
                                this.emitter.emit("onEditProfile");
                                $("#grayBgDiv").hide()
                            }
                            this.$swal({
                                icon: result.type,
                                text: result.message,
                            })
                        })
                }
                else {
                    formData = new FormData()
                    formData.append('image_profile', $('#file')[0].files[0]);
                    formData.append('user_id', this.user_info.id)
                    formData.append('first_name', this.user_info.first_name)
                    formData.append('middle_name', this.user_info.middle_name)
                    formData.append('last_name', this.user_info.last_name)
                    formData.append('birthday', this.user_info.birthday)

                    postImageData(`${this.BASE_URL}/home/upload.php`, formData)
                        .then(result => {
                            if (result.type == "success") {
                                this.emitter.emit("onEditProfile");
                                $("#grayBgDiv").hide()
                            }
                            this.$swal({
                                icon: result.type,
                                text: result.message,
                            })
                        })
                }
        },
        previewImage() {
            var reader = new FileReader();
            reader.onload = function () {
                $("#imgProfile").attr("src", reader.result)
            };
            reader.readAsDataURL($("#file")[0].files[0])
            //this.user_info.image = reader.result
        },
    },
    async mounted() {
        clearForm("profile")
        let user = this.getCookie("user")

        if (user == "") {
            logout(this.$swal, this.$router)
        }
        let profile_bdate = document.getElementById("profile_bdate")
        profile_bdate.max = date_setter()

        let profile_id = this.$router.currentRoute._value.params.id.split("=")[1]

        getAxiosData(`${this.BASE_URL}/home/users.php?profile_id=${profile_id}`)
            .then(result => {
                this.user_info = result.data
            })
    }
}

function clearForm(form) {
    if(form == "profile") {
        $("#profile_fname").attr("class", "input-checker")
        $("#profile_lname").attr("class", "input-checker")
    }
}
</script>

<style scoped>
#grayBgDiv {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(50, 50, 50, 0.8);
    display: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: rgba(38, 71, 78, 1);
}

img {
    border: 2px solid rgba(38, 71, 78, 1);
}

.editProfileDiv {
    width: 400px;
    height: 700px;
    background: rgba(200, 200, 200, 1);
}

.inputfile {

    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}


.inputfile+label {
    position: relative;
    margin-left: -43px;
    top: -9px;
    color: white;
    background: rgba(38, 71, 78, 1);
    display: inline-block;
    cursor: pointer;
    height: 35px;
    text-align: center;
    padding: 10px;
    padding-top: 5px;
}

.inputfile:focus+label,
.inputfile+label:hover {
    background: rgba(58, 91, 98, 1);
}

.icon {
    color: rgba(250, 250, 250, 1);
    font-size: 1.5em;
}
</style>