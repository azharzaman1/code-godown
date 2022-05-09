import { Grid, Skeleton, Stack } from "@mui/material";

const SnippetCardSkeleton = ({ ...rest }) => {
  return (
    <Grid
      item
      xs={12}
      sm={10}
      md={6}
      xl={4}
      className="snippet__card w-full min-h-[500px]"
      {...rest}
    >
      <div className="flex flex-col px-4 pt-4 pb-2 bg-backgroundContrast dark:bg-backgroundContrastDark rounded-lg shadow-md">
        <div className="snippetCard__header">
          <Skeleton variant="rectangular" width="60%" height={25} />
          <div className="flex justify-between items-center mt-2">
            <Skeleton variant="rectangular" width="40%" height={20} />
            <Skeleton variant="rectangular" width="40%" height={20} />
          </div>
        </div>

        <div className="snippetCard__body pt-2">
          <Skeleton variant="rectangular" width="100%" height={375} />
        </div>

        <div className="snippetCard__footer mt-2">
          <Stack direction="column">
            <div className="files mt-2 w-full flex items-center space-x-2">
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: 6 }}
                width="25%"
                height={25}
              />
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: 6 }}
                width="25%"
                height={25}
              />
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: 6 }}
                width="25%"
                height={25}
              />
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <div className="tags flex items-center flex-wrap space-x-2">
                <Skeleton variant="rectangular" width="18%" height={18} />
                <Skeleton variant="rectangular" width="18%" height={18} />
                <Skeleton variant="rectangular" width="18%" height={18} />
                <Skeleton variant="rectangular" width="18%" height={18} />
                <Skeleton variant="rectangular" width="18%" height={18} />
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </Grid>
  );
};

export default SnippetCardSkeleton;
