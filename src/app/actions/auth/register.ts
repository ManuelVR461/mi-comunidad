'use server';

import prisma from '@/libs/prisma/prisma';
import bcryptjs from 'bcryptjs';

export const registerUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  province: string,
  commune: string,
  street: string,
  houseNumber: number,
  postalCode: string,
  phone: string,
  verificationCode: string
) => {
  try {
    // Verificar si el usuario ya existe
    const userFound = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userFound) {
      return {
        ok: false,
        message: 'El usuario ya existe',
      };
    }

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: bcryptjs.hashSync(password),
        verificationCode,
      },
      select: {
        id: true,
        email: true,
      },
    });

    // Crear el perfil del usuario
    await prisma.userprofile.create({
      data: {
        userId: user.id,
        firstname,
        lastname,
        province,
        commune,
        street,
        houseNumber,
        postalCode,
        phone,
      },
    });

    return {
      ok: true,
      user: user,
      message: 'Usuario creado',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo crear el usuario',
    };
  }
};