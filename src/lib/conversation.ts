import { toast } from 'react-hot-toast';

import { db } from './database';

const findConversation = async (memberIdOne: string, memberIdTwo: string) => {
  const conversation = await db.conversation.findFirst({
    where: {
      AND: [{ memberIdOne }, { memberIdTwo }]
    },
    include: {
      memberOne: {
        include: {
          profile: true
        }
      },
      memberTwo: {
        include: {
          profile: true
        }
      }
    }
  });

  return conversation;
};

const createNewConversation = async (
  memberIdOne: string,
  memberIdTwo: string
) => {
  try {
    const conversation = await db.conversation.create({
      data: {
        memberIdOne,
        memberIdTwo
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    });
  } catch (err: unknown) {
    toast.error('An error occurred while creating a conversation.');
    return null;
  }
};

const getOrCreateConversation = async (
  memberIdOne: string,
  memberIdTwo: string
) => {
  let conversation =
    (await findConversation(memberIdOne, memberIdTwo)) ||
    (await findConversation(memberIdTwo, memberIdOne));

  if (!conversation) {
    conversation = await createNewConversation(memberIdOne, memberIdTwo);
  }

  return conversation;
};

export default getOrCreateConversation;
