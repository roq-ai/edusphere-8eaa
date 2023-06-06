import AppLayout from 'layout/app-layout';
import React from 'react';
import NextLink from 'next/link';
import { Text, Box, Spinner, Link } from '@chakra-ui/react';
import { getUserById } from 'apiSdk/users';
import { Error } from 'components/error';
import { UserInterface } from 'interfaces/user';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function UserViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useSWR<UserInterface>(
    () => (id ? `/users/${id}` : null),
    () => getUserById(id),
  );
  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        User Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Email:
            </Text>
            <Text ml={4} fontSize="lg" as="span">
              {data?.email}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              First Name:
            </Text>
            <Text ml={4} fontSize="lg" as="span">
              {data?.firstName}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Last Name:
            </Text>
            <Text ml={4} fontSize="lg" as="span">
              {data?.lastName}
            </Text>
            <br />

            <>
              <Text fontSize="lg" fontWeight="bold" as="span">
                School Administrator of educational_institution:
              </Text>
              <Text fontSize="md" as="span">
                <Link
                  as={NextLink}
                  href={`/educational-institutions/view/${data?.school_administrator?.[0]?.educational_institution?.id}`}
                >
                  {data?.school_administrator?.[0]?.educational_institution?.name}
                </Link>
              </Text>
              <br />
            </>
            <>
              <Text fontSize="lg" fontWeight="bold" as="span">
                Student of learning_path:
              </Text>
              <Text fontSize="md" as="span">
                <Link as={NextLink} href={`/learning-paths/view/${data?.student?.[0]?.learning_path?.id}`}>
                  {data?.student?.[0]?.learning_path?.name}
                </Link>
              </Text>
              <br />
            </>
            <>
              <Text fontSize="lg" fontWeight="bold" as="span">
                Student Support of educational_institution:
              </Text>
              <Text fontSize="md" as="span">
                <Link
                  as={NextLink}
                  href={`/educational-institutions/view/${data?.student_support?.[0]?.educational_institution?.id}`}
                >
                  {data?.student_support?.[0]?.educational_institution?.name}
                </Link>
              </Text>
              <br />
            </>
            <>
              <Text fontSize="lg" fontWeight="bold" as="span">
                Teacher of educational_institution:
              </Text>
              <Text fontSize="md" as="span">
                <Link
                  as={NextLink}
                  href={`/educational-institutions/view/${data?.teacher?.[0]?.educational_institution?.id}`}
                >
                  {data?.teacher?.[0]?.educational_institution?.name}
                </Link>
              </Text>
              <br />
            </>
          </>
        )}
      </Box>
    </AppLayout>
  );
}
/*
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: "user",
  operation: AccessOperationEnum.READ,
})(UserViewPage);*/

export default UserViewPage;
