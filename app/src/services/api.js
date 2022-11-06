import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://purple-rabbit-56.loca.lt/api',
});


axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    request.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

export const authAPI = {
  async login(user) {
    const response = await axiosInstance.post('/auth/login', user);

    if (response.status == 200) {
      return response.data;
    }
  },

  async addCustomer(table_id){
    const response = await axiosInstance.post('/auth/register/customer', {table_id});
    console.log(response)

    if (response.status == 201) {
      return response.data;
    }
  }
};

export const employeeAPI = {
  async getAll() {
    const response = await axiosInstance.get('/employees');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },
  async saveNew(employee) {
    const response = await axiosInstance.post('/employees', employee);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(employee) {
    const response = await axiosInstance.put(
        `/employees/${employee.id}`,
        employee,
    );
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async get(id) {
    const response = await axiosInstance.get(`/employees/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const reviewAPI = {
  async getAll() {
    const response = await axiosInstance.get('/reviews');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },

  async saveNew(review) {
    const response = await axiosInstance.post('/reviews', review);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },
  async update(review) {
    const response = await axiosInstance.put('/reviews', review);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
  async get(id) {
    const response = await axiosInstance.get(`/reviews/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const ratingAPI = {
  async getAll() {
    const response = await axiosInstance.get('/ratings');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },
  async saveNew(rating) {
    const response = await axiosInstance.post('/ratings', rating);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(rating) {
    const response = await axiosInstance.put('/ratings', rating);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
  async get(id) {
    const response = await axiosInstance.get(`/ratings/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const promotionAPI = {
  async getAll() {
    const response = await axiosInstance.get('/promotions');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },

  async saveNew(promotion) {
    const response = await axiosInstance.post(
        '/promotions', promotion,
    );
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(promotion) {
    const response = await axiosInstance.put(
        `/promotions/${promotion.id}`, promotion,
    );
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async get(id) {
    const response = await axiosInstance.get(
        `/promotions/${id}`,
    );
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const paymentAPI = {
  async getAll() {
    const response = await axiosInstance.get('/payments');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },
  async saveNew(payment) {
    const response = await axiosInstance.post('/payments', payment);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(payment) {
    const response = await axiosInstance.put(
        `/payments/${payment.id}`,
        payment,
    );
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async get(paymentId) {
    const response = await axiosInstance.get(`/payments/${paymentId}`);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const foodAPI = {
  async getAll() {
    const response = await axiosInstance.get('/foods');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },
  async saveNew(food) {
    const response = await axiosInstance.post('/foods', food);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(food) {
    const response = await axiosInstance.put(`/foods/${food.id}`, food);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async get(id) {
    const response = await axiosInstance.get(`/foods/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const foodAllergyAPI = {
  async getAll() {
    const response = await axiosInstance.get('/foodAllergies');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },
  async saveNew(foodAllergy) {
    const response = await axiosInstance.post('/foodAllergies', foodAllergy);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(foodAllergy) {
    const response = await axiosInstance.put(
        `/foodAllergies/${foodAllergy.id}`,
        foodAllergy,
    );
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async get(foodAllergyId) {
    const response = await axiosInstance.get(`/foodAllergies/${foodAllergyId}`);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const orderApi = {
  async getAll() {
    const response = await axiosInstance.get(
        '/orders?ofuser=1',
    );
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },

  async saveNew(order) {
    const response = await axiosInstance.post('/orders', order);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(order) {
    const response = await axiosInstance.put(
        `/orders/${order.order_number}`, order,
    );
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async get(orderNumber) {
    const response = await axiosInstance.get(
        `/orders/${orderNumber}`,
    );
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};

export const tableAPI = {
  async getAll() {
    const response = await axiosInstance.get('/tables');
    if (response.status === 200) {
      return response.data;
    }
    return [];
  },
  async saveNew(table) {
    const response = await axiosInstance.post('/tables', table);
    if (response.status === 201) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async update(table) {
    const response = await axiosInstance.put('/tables', table);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },

  async get(tableId) {
    const response = await axiosInstance.get(`/tables/${tableId}`);
    if (response.status === 200) {
      return response.data;
    }
    return {
      success: false,
    };
  },
};
