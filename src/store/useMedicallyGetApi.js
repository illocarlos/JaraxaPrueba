import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define the store
export const useMedicallyGetApi = create(
    devtools(
        persist(
            (set) => ({
                medically: [],
                activeId: '',
                resetMedically: () => set({ medically: [] }),
                getMedicallyApi: async (data) => {
                    console.log("Request data:", data);
                    const medicamentName = encodeURIComponent(data.name); // Encode the medication name

                    try {
                        const response = await fetch(
                            `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${medicamentName}"&limit=20`
                        );
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const result = await response.json();
                        console.log("API Result:", result);
                        if (!result.results) {
                            throw new Error('No results found');
                        }
                        const medications = result.results.map(item => ({
                            id: item.id || '',
                            brand_name: item.openfda?.brand_name?.[0] || "",
                            ingredient: item?.active_ingredient || "",
                            manufacturer_name: item.openfda?.manufacturer_name?.[0] || '',
                            administration: item?.dosage_and_administration || "",
                            dont_use: item?.do_not_use || '',
                            when_use: item?.when_using || '',
                            when_stop: item?.stop_use || '',
                            purpose: item?.purpose || '',
                            pregnancy: item?.pregnancy_or_breast_feeding || '',
                            label_principal: item?.package_label_principal_display_panel?.[1] || "",
                            active_ingredient: item?.active_ingredient || '',
                            type_medications: [
                                item.openfda?.pharm_class_cs || '',
                                item.openfda?.pharm_class_epc || ''
                            ],
                            storage: item?.storage_and_handling || "",
                        }));
                        console.log('Parsed medications:', medications);
                        set({ medically: medications });
                    } catch (err) {
                        console.error('Error fetching data from OpenFDA API:', err.message);
                    }
                },
            }),
            {
            }
        )
    )
);
