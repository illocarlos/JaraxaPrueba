import { useMemo } from "react";
import { useMedicallyGetApi } from "../store/useMedicallyGetApi";
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import PropTypes from 'prop-types';

const CardMedical = ({ openModal }) => {
    const medical = useMedicallyGetApi(state => state.medically);
    const isMedical = useMemo(() => medical.length > 0, [medical]);
    const coincident = useMemo(() => medical.length, [medical]);

    const selectMedical = (eachMedically) => {
        openModal(eachMedically);
    };



    return (
        <div className="w-full h-full">





            {coincident > 0 && <p className="text-blue-500 text-center text-3xl">Result: {coincident}</p>}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {isMedical ?
                    (
                        medical.map(eachMedically => (
                            <Card
                                onClick={() => selectMedical(eachMedically)}
                                key={eachMedically.id}
                                className="flex-1 flex flex-col justify-between  min-w-[200px] mb-4 shadow-lg transition-all duration-1000 transform hover:scale-105"
                            >
                                <CardContent className="p-4 ">
                                    <Typography
                                        style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                                        className="text-center text-lg " component="div">
                                        {eachMedically.brand_name}
                                    </Typography>
                                    <Typography
                                        mt={2}
                                        className="text-center text-sm text-gray-600"
                                        component="div"
                                    >
                                        {eachMedically.ingredient}
                                    </Typography>
                                </CardContent>
                                <CardActions className="justify-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => selectMedical(eachMedically)}
                                    >
                                        More Info
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-shadow-md font-extrabold text-4xl text-blue-500">No results found</p>
                    )}
            </div>
        </div>
    );
};

CardMedical.propTypes = {
    openModal: PropTypes.func.isRequired,
};

export default CardMedical;
