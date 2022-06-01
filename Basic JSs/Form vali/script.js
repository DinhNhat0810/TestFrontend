//Doi tuong `Validator`
function Validator(options) {

    var selectorRules = {}

    //Ham thuc hien Validate cua form
    function Validate(inputElement,rule) {
        const elementParent = inputElement.closest(options.formGroupSelector)
        const errorElement = elementParent.querySelector(options.errorSelector)
        var errorMessage

        //Lay ra cac rule cua selector
        var rules = selectorRules[rule.selector]

        //Lap qua tung rule va kiem tra
        //Neu co loi thi dung viec kiem tra
        for (var i = 0 ; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    )
                    break
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            if (errorMessage) break
        }

                if(errorMessage) {
                    errorElement.innerText = errorMessage
                    elementParent.classList.add('invalid')
                 
                }else{
                    errorElement.innerText = ''
                    elementParent.classList.remove('invalid')

                }

                return !errorMessage
                
    }
    //Lay element cua form can validate
    var formElement = document.querySelector(options.form)
    if(formElement) {
        //Khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault()

            var isFormValid = true

            //Lap qua tung rule va validate
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = Validate(inputElement, rule)
                if(!isValid) {
                    isFormValid = false
                }
            })

            if(isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break

                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = ''
                                    return values
                                }

                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = []
                                }

                                values[input.name].push(input.value)
                                break
                            
                            case 'file':
                                values[input.name] = input.files
                                break
                            default:
                                values[input.name] = input.value
                        }
                        return values
                    }, {})
                }

                options.onSubmit(formValues)
            }

        }

        //Lap qua moi rule va xu ly(lang nge blur, input,..)
        options.rules.forEach(function(rule) {

            //Luu lai cac rule cho moi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                //Gan phan tu dau tien cua mang
                selectorRules[rule.selector] = [rule.test]
            }
            var inputElements = formElement.querySelectorAll(rule.selector)

            Array.from(inputElements).forEach(function(inputElement) {
                if(inputElement) {
                    //Xu ly blur
                    inputElement.onblur = function() {
                        //value: inputElement.value
                        //test func: rule.test
                        Validate(inputElement, rule) 
                    }
    
                    //Xu ly khi nguoi dung nhap vao input
                    inputElement.oninput = function() {
                        const elementParent = inputElement.closest(options.formGroupSelector)
                        const errorElement = elementParent.querySelector(options.errorSelector)
                        errorElement.innerText = ''
                        elementParent.classList.remove('invalid')
                        
                    }

    
                }

            })
 
        })

    }

}


//dinh nghia cac rule
//Nguyen tac cua rules:
//1. Khi co loi => Tra ra message loi
//2. khi hop le => Khong tra ra cai gi ca (undefined)
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            //Kiểm tra xem người dùng đã nhập chưa 
            if(typeof value === 'string'){
                return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
            }
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
             // Kiểm tra xem có phải là email hay không  nguồn stackoverflow
             const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             return re.test(String(value).toLowerCase()) ? undefined : message || 'Vui lòng nhập email';
 
        }
    };
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
             // Kiểm tra password
             return value.length >= min ? undefined : message || `Vui long nhap vao ${min} ky tu`
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Gia tri nhap vao khong dung'
        }
    }
}



