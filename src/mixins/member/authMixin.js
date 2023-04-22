import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

export default () => {
  const fields = reactive({
    /**
     * isNeedLogin: 로그인 입력창 구분(true)
     */
    email: {
      value: null,
      label: 'Email',
      type: 'email',
      isNeedLogin: true,
      rules: ['required', 'emailFormat'],
    },
    password: {
      value: null,
      label: 'Password',
      type: 'password',
      isNeedLogin: true,
      status: false,
      appendIcon: 'mdi-eye-off',
      rules: ['required'],
    },
    confirmPassword: {
      value: null,
      label: 'Check Password',
      type: 'password',
      isNeedLogin: false,
      status: false,
      appendIcon: 'mdi-eye-off',
      rules: ['required'],
    }
  })

  const rules = {
    required: (value) => value?.length > 0 ?? false,
    emailFormat: (value) => {
      console.log('emailFormat')
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value)
    },
  }

  const validationRules = {
    email: {
      value: { required, email }
    },
    password: {
      value: { required }
    },
    confirmPassword: {
      sameAsPassword: sameAs(fields.confirmPassword.value)
    },
  }

  const v$ = useVuelidate(validationRules, fields)

  const passwordInputKeys = computed(() => {
    return Object.keys(fields)
      .filter(key => key.toLowerCase().includes('password'))
  })

  const route = useRoute()
  const checkValidation = computed(() => {
    return Object.values(fields)
      .filter(input => route.name === 'SignUp' || input.isNeedLogin)
      .every(input => {
        return input.rules.every(rule => {
          if (!rules[rule](input.value)) {
            return false
          }

          return true
        })
      })
  })

  const togglePasswordInputType = (key) => {
    fields[key].type = fields[key].status ? 'text' : 'password'
  }
  const togglePasswordIcon = (key) => {
    fields[key].appendIcon = fields[key].status ? 'mdi-eye' : 'mdi-eye-off'
  }
  const toggleInputStatus = (key) => {
    fields[key].status = !fields[key].status

    // 비밀번호 입력에 대한 visible toggling
    if (passwordInputKeys.value.includes(key)) {
      togglePasswordIcon(key)
      togglePasswordInputType(key)
    }
  }

  return { fields, v$, passwordInputKeys, checkValidation, togglePasswordInputType, togglePasswordIcon, toggleInputStatus }
}
