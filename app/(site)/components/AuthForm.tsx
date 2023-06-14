//Melvin Towo
//ALFA MEDIA X
// Xchat website
'use client';
import React, {useState, useEffect, useCallback} from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/inputs/inputs';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub, BsGoogle, BsFacebook} from 'react-icons/bs'

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    
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
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if(variant === 'REGISTER') {
            //Axios Register
        }

        if (variant === 'LOGIN') {
            //NextAuth Sign in
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
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
                    <Input id='Email' label="Email address" type='email' register={register} errors={errors}/>
                    <Input id='password' label="Password" register={register} errors={errors}/>
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
                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
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
                <div className='flex  justify-center text-xs px-2 text-gray-300'>
                    <p>©ALFA Media, Xchat&trade;, some rights reserved</p>
                </div>
            </div>
        </div>
    )
}

export default AuthForm