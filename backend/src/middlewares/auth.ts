import { PrismaClient } from "@prisma/client";
import zxcvbn from "zxcvbn";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();

export const checkinputs = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstname, lastname, username, useremail, password } = req.body;
    if (!firstname) {
      res.status(400).json({ message: "please provide first name" });
      return;
    }
    if (!lastname) {
      res.status(400).json({ message: "please provide last name" });
      return;
    }
    if (!username) {
      res.status(400).json({ message: "please provide user name" });
      return;
    }
    if (!useremail) {
      res.status(400).json({ message: "please provide an email" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "please provide a password" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const checkemailandusername = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, useremail } = req.body;
    const userName = await prisma.user.findFirst({
      where: { username: username },
    });
    if (userName) {
      res.status(400).json({ message: "user name already exists" });
      return;
    }
    const userEmail = await prisma.user.findFirst({
      where: { useremail: useremail },
    });
    if (userEmail) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const checkpasswordstrength = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password } = req.body;
    const { score } = zxcvbn(password);
    if (score < 3) {
      res.status(400).json({ message: "Password is too weak" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signinemailpswdcheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { useremail, password } = req.body;

    const userdetails = await prisma.user.findFirst({
      where: {
        useremail: useremail,
      },
    });

    if (!userdetails) {
      res.status(400).json({ message: "wrong signin credentials" });
      return;
    }

    const unhashedpswd = await bcrypt.compare(password, userdetails.password);

    if (!unhashedpswd) {
      res.status(400).json({ message: "wrong signin credentials" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const checkinputupdates = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstname, lastname, username, useremail } = req.body;
    if (!firstname) {
      res.status(400).json({ message: "please provide first name" });
      return;
    }
    if (!lastname) {
      res.status(400).json({ message: "please provide last name" });
      return;
    }
    if (!username) {
      res.status(400).json({ message: "please provide user name" });
      return;
    }
    if (!useremail) {
      res.status(400).json({ message: "please provide an email" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const checkpasswordinputs = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { prevpas, password } = req.body;

    if (!prevpas || !password) {
      res
        .status(400)
        .json({ message: "please provide both new and old password" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const checkpasswordvalidity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.owner;
    const { prevpas } = req.body;
    const oldpassword = await prisma.user.findFirst({
      where: { id },
    });
    const unhashedpswd = await bcrypt.compare(prevpas, oldpassword!.password);

    if (!unhashedpswd) {
      res.status(400).json({ message: "wrong old password" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const checkemail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { useremail } = req.body;
    if (!useremail) {
      res.status(400).json({ message: "please provide an email" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const checkvalidemail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { useremail } = req.body;
    const email = await prisma.user.findFirst({
      where: { useremail: useremail },
    });
    if (!email) {
      res.status(400).json({ message: "Provide a valid email" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const generateopt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { useremail } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expotp = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const updateotp = await prisma.user.update({
      where: { useremail },
      data: { otp: otp, otpExpiresAt: expotp },
    });
    if (!updateotp) {
      res.status(400).json({ message: "Opps unable to generate Otp" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
