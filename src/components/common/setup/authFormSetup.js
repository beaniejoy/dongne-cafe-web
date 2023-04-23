import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email, sameAs } from '@vuelidate/validators'

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

  const v$ = useVuelidate(createValidationRules(fields), fields)

  const { passwordInputKeys, checkValidation } = createVueComputed({ fields, v$ })

  return { fields, v$, checkValidation, ...createVueMethods({ fields }, { passwordInputKeys }) }
}

// make vuelidate rules
function createValidationRules(fields) {
  const requiredWithMessage = helpers.withMessage('필수로 입력해야하는 값입니다.', required)
  const emailWithMessage = helpers.withMessage('이메일 형식이 올바르지 않습니다.', email)
  const confirmPasswordWithMessage = helpers.withMessage('비밀번호가 일치하지 않습니다.', sameAs(computed(() => fields.password.value)))
  
  const rules = { 
    email: {
      value: { 
        required: requiredWithMessage, 
        email: emailWithMessage 
      }
    },
    password: {
      value: { required: requiredWithMessage }
    },
    confirmPassword: {
      value: { 
        required: requiredWithMessage, 
        sameAsPassword: confirmPasswordWithMessage
      }
    },
  }

  return rules
}

function createVueComputed(vueData) {
  const { fields, v$ } = vueData

  const passwordInputKeys = computed(() => {
    return Object.keys(fields)
      .filter(key => key.toLowerCase().includes('password'))
  })

  const route = useRoute()

  const checkValidation = computed(() => {
    return Object.keys(fields)
      .filter(key => route.name === 'SignUp' || fields[key].isNeedLogin)
      .every(key => !v$.value[key].$invalid)
  })

  return { passwordInputKeys, checkValidation }
}

function createVueMethods(vueData, vueComputed) {
  const { fields } = vueData
  const { passwordInputKeys } = vueComputed

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

  return { toggleInputStatus }
}