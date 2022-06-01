function Validator(formSelector) {

    var formRules = {}
    var _this = this
    var checkPass


    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }

            element = element.parentElement
        }
    }

    function underlines() {
        const inputs = document.querySelectorAll('input')
        const underlines = document.querySelectorAll('.underline')


        inputs.forEach((input,index)=>{
            input.addEventListener('focus', ()=>{
                underlines[index].style.width = '100%'
            })
            input.addEventListener('blur', ()=>{
                underlines[index].style.width = '0'
            })
        })
    }

    underlines()

    
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui long nhap truong nay'
        },

        email: function(value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(value).toLowerCase()) ? undefined : 'vui long nhap email!'
        },

        min: function(min) {
            return function(value) {
                checkPass = value
                return value.length >= min ? undefined : `Vui long nhap vao ${min} ky tu`
            }
        },

        confirm: function(value) {
            return value == checkPass ? undefined : `Vui long nhap dung mat khau`
        }

    }


    var formElement = document.querySelector(formSelector)

    if (formElement) {

        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {

            var rules = input.getAttribute('rules').split('|')
            for (var rule of rules) {

                //var rule infor
                var ruleFunc = validatorRules[rule]

                if (rule.includes(':')) {
                    var ruleInfor = rule.split(':')
                    rule = ruleInfor[0]
                    ruleFunc = validatorRules[rule](ruleInfor[1])
                    
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc]
                }
            }

            input.onblur = handleValidate
            input.oninput = handleClearError
            
        }

    }

    function handleValidate(e) {
        var rules = formRules[e.target.name]
        var errorMessage
        for (var rule of rules) {
            errorMessage = rule(e.target.value)
            if (errorMessage) {
                break
            }
        }

        if (errorMessage) {
            var formControl = getParent(e.target, '.form-control')
            if (formControl) {
                formControl.classList.add('invalid')

                var formMessage = formControl.querySelector('.form-message')
                if (formMessage) {
                    formMessage.innerText = errorMessage
                }
            }

        }

        return !errorMessage
    }

    function handleClearError(e) {
        var formControl = getParent(e.target, '.form-control')
        if (formControl.classList.contains('invalid')) {
            formControl.classList.remove('invalid')
        }
        var formMessage = formControl.querySelector('.form-message')

        if (formMessage) {
            formMessage.innerText = ''
        }
    }

    formElement.onsubmit = function(e) {
        e.preventDefault()

        var inputs = formElement.querySelectorAll('[name][rules]')
        var isValid = true
        for (var input of inputs) {
            if (!handleValidate({ target: input})) {
                isValid = false
            }
        }

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