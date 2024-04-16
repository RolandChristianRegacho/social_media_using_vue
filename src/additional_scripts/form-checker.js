export default function form_check(form) {
    let counter = 0

    for(let items in form) {
        if(items != "middle_name" && items != "user_id") {
            if(form[items].length < 2) {
                return {
                    type: "fail",
                    data: {
                        form: items,
                        index: counter
                    }
                }
            }
        }
        counter++
    }

    return {
        type: "success"
    }
}

export function date_setter() {
    let current_date = new Date().toISOString().split("T")[0]
    let splitted_date = current_date.split("-")
    
    return `${splitted_date[0]}-${splitted_date[1]}-${splitted_date[2]-1}`
}