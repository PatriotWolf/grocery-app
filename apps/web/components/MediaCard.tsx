import { Card, CardMedia, CardContent, CardActions } from '@mui/material';

interface Props {
  image: string;
  children: React.ReactNode;
  ActionSection?: () => JSX.Element;
}

const MediaCard = ({ children, image, ActionSection }: Props) => {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>{children}</CardContent>
      {ActionSection && (
        <CardActions>
          <ActionSection />
        </CardActions>
      )}
    </Card>
  );
};
export default MediaCard;
