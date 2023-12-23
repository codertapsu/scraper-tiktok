type DefaultPageProps = {
  params?: Record<string | undefined>;
  searchParams?: Record<string | string[], string | undefined>;
};

type PageProps<P = NonNullable<unknown>> = P & DefaultPageProps;
