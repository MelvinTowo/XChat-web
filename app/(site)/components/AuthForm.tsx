//Melvin Towo
// ALFA MEDIA X
// Xchat 
'use client';
import React, {useState, useCallback} from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/inputs/inputs';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub, BsGoogle, BsFacebook} from 'react-icons/bs'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {signIn} from 'next-auth/react'

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    
    // The toggleVariant function is intended to be used as an event handler or 
    // trigger for changing the variant state in response to user interaction
    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const {
        register, 
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if(variant === 'REGISTER') {
            //Here we post the data to the route function in the api/register folder
            //Toast pulls a little notification letting user know there was an error
            axios.post('/api/register', data)
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false)) //This stops loading when a new user is created
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if(callback?.error) {
                    toast.error('Invalid Username or Password');
                }

                if (callback?.ok && !callback.error) {
                    toast.success('Success!')
                }
            }).finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        //login via google, facebook and github!

        setIsLoading(true);

        signIn(action, {redirect: false}).then((callback) => {
            if (callback?.error) {
                toast.error('Invalid Username or Password')
            }

            if (callback?.ok && !callback.error) {
                toast.success('Success!')
            }
        }).finally(() => setIsLoading(false))

    }

    return (
        <div
            className='
             mt-8
             sm:mx-auto
             sm:w-full
             sm:max-w-md
            '
        >
            <div
            className='
            bg-white
            px-4 
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
            '
            >
                <form
                className='space-y-6'
                onSubmit={handleSubmit(onSubmit)} // The handleSubmit helps pass the data from the onSubmit we created above
                >
                    {variant === 'REGISTER' && (
                        <Input id='name' label="Name" register={register} errors={errors}/>
                    )}
                    <Input id='email' label="Email address" type='email' register={register} errors={errors} disabled={isLoading}/>
                    <Input id='password' label="Password" type='password' register={register} errors={errors} disabled={isLoading}/>
                    <div>
                        <Button
                        disabled={isLoading}
                        fullwidth
                        type='submit'>
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className='mt-6'>
                    <div className='relative'>
                        <div
                        className='
                            absolute
                            inset-0
                            flex
                            items-center
                        '
                        >
                            <div
                            className='
                                w-full 
                                border-t
                                border-gray-300
                            '>
                            </div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                                <span className='bg-white px-2 text-gray-500'>
                                    Or continue with
                                </span>
                        </div>
                    </div>

                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton 
                            icon = {BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton 
                            icon = {BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                        <AuthSocialButton 
                            icon = {BsFacebook}
                            onClick={() => socialAction('facebook')}
                        />
                    </div>
                </div>
                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-600'>
                    <div>
                        {variant === 'LOGIN' ? 'New to XChat?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className='underline cursor-pointer'>
                            {variant === 'LOGIN' ? 'Create an account': 'Login'}
                    </div>
                </div>
                <br />
                <div className='flex  justify-center text-xs px-2 text-gray-400'>
                    <p>©ALFA Media, Xchat&trade;, some rights reserved</p>
                </div>
            </div>
        </div>
    )
}

export default AuthForm