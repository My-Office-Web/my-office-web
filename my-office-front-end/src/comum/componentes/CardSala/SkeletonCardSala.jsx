import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Box,
  Skeleton,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SkeletonCardSala() {
  return (
    <Card
      sx={{
        maxWidth: 360,
        borderRadius: 3,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(5.03)',
          boxShadow: 6,
        },
      }}
    >
      {/* Header com avatar e texto */}
      <CardHeader
        avatar={
          <Skeleton variant="circular">
            <Avatar sx={{ bgcolor: red[500] }}>S</Avatar>
          </Skeleton>
        }
        title={<Skeleton width="100%" height={24} />}
        subheader={<Skeleton width="100%" height={20} />}
      />

      {/* Imagem */}
      <CardMedia>
        <Skeleton variant="rectangular" height={180} width={500} />
      </CardMedia>

      {/* Conteúdo */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Skeleton width="40%" height={24} />
          <Skeleton width="40%" height={24} />
        </Box>
        <Skeleton height={20} />
        <Skeleton width="90%" height={20} sx={{ mt: 1 }} />
      </CardContent>

      {/* Ações com botões desativados */}
      <CardActions disableSpacing>
        <IconButton disabled>
          <FavoriteIcon />
        </IconButton>
        <IconButton disabled>
          <ShareIcon />
        </IconButton>
        <IconButton disabled sx={{ marginLeft: 'auto' }}>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
