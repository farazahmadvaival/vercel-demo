import { SidebarFilter } from ".";
import { ApiUrl } from "../../apis/apiUrl";
import { QUERY_KEYS } from "../../hooks/queryKeys";
import { useQuery } from "../../hooks/useQuery";

export const UserCollectionSideFilter = ({ onChange }: any) => {
  const { data: collections } = useQuery<any>({
    queryKey: [QUERY_KEYS.GET_COLLECTIONS_NAME],
    url: ApiUrl?.GET_COLLECTIONS_NAME,
    showToast: false,
    token: true,
  });

  const filters = [
    {
      label: "Status",
      name: "status",
      hasFilters: true,
      border: true,
      filters: [
        {
          name: "status",
          type: "radio",
          options: ["all", "buyNow"],
          label: ["All", "Buy Now"],
        },
      ],
    },

    {
      label: "Collections",
      name: "collections",
      hasFilters: true,
      border: false,
      showQuantity: false,
      filters:
        collections &&
        collections?.map((collection: any, index: number) => {
          return {
            label: collection?.name.substring(0, 16) + "...",
            name: collection?.id,
            type: "checkbox",
          };
        }),
    },
  ];
  return (
    <SidebarFilter
      filterGroups={filters}
      onFilterChange={(filters: any) => onChange(filters)}
    />
  );
};
