function Validator(formSelector) {
    
    var _this = this
    var formRules = {}


    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }

            element = element.parentElement
        }
    }


    /**
     * Quy uoc khi tao rules
     * -Neu co loi thi return `error message`
     * -Neu khong co loi thi return undefined
     */

    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        },

        email: function(value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(value).toLowerCase()) ? undefined : 'Vui lòng nhập email';
        },

        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui long nhap vao ${min} ky tu`
            }


        }

        
    }

    //Lay ra form element trong DOM them `formSeletor`
    var formElement = document.querySelector(formSelector)

    //Chi xu ly khi co element trong DOM
    if (formElement) {

        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {

            var rules = input.getAttribute('rules').split('|')
            for (var rule of rules) {

                // var ruleInfor
                var ruleFunc = validatorRules[rule]
                
                if(rule.includes(':')){
                    var ruleInfor = rule.split(':')
                    rule = ruleInfor[0]
                    ruleFunc =  validatorRules[rule](ruleInfor[1])
                }
                
                
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc]
                }
            }

            //Lang nghe su kien de validate(blur, onchange)
            input.onblur = handleValidate
            input.oninput = handleClearError
        }

        //Ham thuc hien validate
        function handleValidate(event) {
            var rules = formRules[event.target.name]
            var errorMessage
            for (var rule of rules) {
                errorMessage = rule(event.target.value)
                if (errorMessage) {
                    break
                }
            }
            
            //Neu co loi thi hien loi ra UI
            if(errorMessage) {

                var formGroup = getParent(event.target, '.form-group')
                if (formGroup) {
                    formGroup.classList.add('invalid')
                    
                    var formMessage = formGroup.querySelector('.form-message')
                    if (formMessage) {
                        formMessage.innerText = errorMessage
                    }
                }
            }

            return !errorMessage
        }

        //Ham clear messageError
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group')
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid')
            var formMessage = formGroup.querySelector('.form-message')
            
            if (formMessage) {
                formMessage.innerText = ''   
            }
          }
        }

        //Xu ly hanh vi submit form
        formElement.onsubmit = function(event) {
            event.preventDefault()

            var inputs = formElement.querySelectorAll('[name][rules]')
            var isValid = true
            for (var input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false
                }

                
            }

            //Khi khong co loi thi submit form
            if(isValid) {
                if (typeof _this.onSubmit === 'function') {
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

                _this.onSubmit(formValues)
            }
            
        }

        

        

       
    }

    
}