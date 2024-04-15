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