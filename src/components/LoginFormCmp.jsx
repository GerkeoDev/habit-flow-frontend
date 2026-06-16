import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Lock, LogIn } from 'lucide-react'
import HTTPClient from '../utils/HTTPClient'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const LoginFormCmp = () => {
  const [formErrors, setFormErrors] = useState({})
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    setFormErrors({})
    const client = new HTTPClient()
    client.login(data.email, data.password)
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
      <Button type="submit" className="w-full" variant="primary">
        <LogIn size={18} />
        Sign In
      </Button>
    </form>
  )
}

export default LoginFormCmp
