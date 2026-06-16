import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, Mail, Lock, UserPlus } from 'lucide-react'
import HTTPClient from '../utils/HTTPClient'
import AuthValidation from '../utils/AuthValidation'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const RegisterFormCmp = () => {
  const [formErrors, setFormErrors] = useState({})
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    setFormErrors({})
    const validationErrors = AuthValidation(data)
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors)
      return
    }

    const client = new HTTPClient()
    client.register(data)
      .then(() => client.login(data.email, data.password))
      .then(() => client.me())
      .then(() => {
        window.location.href = '/'
      })
      .catch(err => {
        setFormErrors(err.response?.data?.errors || { message: 'Server error' })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Name"
        icon={User}
        type="text"
        placeholder="Enter your name"
        {...register('userName', { required: 'Name is required' })}
        error={errors.userName?.message}
      />
      <Input
        label="Email"
        icon={Mail}
        type="email"
        placeholder="Enter your email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        icon={Lock}
        type="password"
        placeholder="Enter your password"
        {...register('password', { required: 'Password is required' })}
        error={errors.password?.message}
      />
      {formErrors.message && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-300 text-sm">
          {formErrors.message}
        </div>
      )}
      {formErrors.userName && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-300 text-sm">
          {formErrors.userName}
        </div>
      )}
      {formErrors.email && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-300 text-sm">
          {formErrors.email}
        </div>
      )}
      {formErrors.password && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-300 text-sm">
          {formErrors.password}
        </div>
      )}
      <Button type="submit" className="w-full" variant="primary">
        <UserPlus size={18} />
        Register
      </Button>
    </form>
  )
}

export default RegisterFormCmp
