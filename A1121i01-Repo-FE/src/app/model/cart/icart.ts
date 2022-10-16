export interface ICart {
  cartId?: number;
  cartCode?: string;
  cartQuantity?: number;
  cartDateCreate?: string;
  cartStatusId?: number;
  cartTotalMoney?: number;
  cartCustomerId?: ICustomer;
  cartStatusId?: ICartStatus;
  cartAccountId?: number;
  // cartCustomerId?: number;
}
